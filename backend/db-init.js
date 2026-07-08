// Malaria Guide Database Initialization Script
// Initializes and seeds PostgreSQL database

const fs = require('fs');
const path = require('path');
const { Client } = require('pg');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const connectionString = process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/malaria_guide';

console.log('Connecting to PostgreSQL database using:');
console.log(connectionString.replace(/:([^:@]+)@/, ':****@')); // Hide password in logs

const client = new Client({
  connectionString: connectionString
});

async function run() {
  try {
    await client.connect();
    console.log('Successfully connected to PostgreSQL server.');

    // Read the schema.sql file
    const schemaPath = path.join(__dirname, 'schema.sql');
    console.log(`Reading database schema from: ${schemaPath}`);
    const schemaSql = fs.readFileSync(schemaPath, 'utf8');

    // Execute the schema SQL to create/reset tables
    console.log('Resetting and creating tables...');
    await client.query(schemaSql);
    console.log('Tables created successfully.');

    // Seed mock data
    console.log('Seeding initial prototype records...');

    // 1. Seed user
    const userInsertResult = await client.query(`
      INSERT INTO users (name, email, password, role)
      VALUES ($1, $2, $3, $4)
      RETURNING id
    `, ['Health Officer', 'officer@malariaguide.gov', 'admin123', 'health_officer']);
    const officerId = userInsertResult.rows[0].id;
    console.log(`Created mock user 'Health Officer' with ID ${officerId}`);

    // 2. Seed cases
    const casesData = [
      ['Kambia District', 45, 'high', 'Significant rise in water-borne vectors due to recent flooding near the northern border. Recommended actions include mass distribution of LLINs and indoor residual spraying.'],
      ['Kenema Region', 28, 'medium', 'Moderate vector density reported. Community health workers are actively monitoring fever cases and administering rapid diagnostic tests.'],
      ['Port Loko', 12, 'low', 'Low transmission rate maintained. Preventive larviciding has been successfully completed across key breeding reservoirs.'],
      ['Makeni City', 52, 'high', 'Heavy infestation reported in peri-urban sectors. Emergency therapeutic response has been deployed alongside community sensitization campaigns.'],
      ['Bo Town', 31, 'medium', 'Slight seasonal case uptick. Medical facilities report stable supplies of ACT antimalarials, but caution is advised in low-lying sections.'],
      ['Freetown Rural', 8, 'low', 'Excellent compliance with weekly net usage. Mosquito populations remain under control due to active drainage maintenance.']
    ];

    for (const item of casesData) {
      await client.query(`
        INSERT INTO cases (location, cases_count, severity, details, reported_by)
        VALUES ($1, $2, $3, $4, $5)
      `, [...item, officerId]);
    }
    console.log(`Seeded ${casesData.length} cases.`);

    // 3. Seed alerts
    const alertsData = [
      [
        'High Risk Outbreak', 'Kambia District', 
        'Significant increase in malaria cases reported. Immediate intervention required.', 
        '2 hours ago', 45, 'increasing', 'critical',
        'Over the last 72 hours, local clinics in Kambia have reported a 40% surge in positive malaria rapid diagnostic test results. Vector control teams have been dispatched with bed nets and diagnostic test kits. Local population is advised to stay indoors after dusk and secure all open windows.'
      ],
      [
        'Medium Risk Alert', 'Kenema Region', 
        'Moderate rise in malaria cases. Monitor situation closely.', 
        '5 hours ago', 28, 'stable', 'warning',
        'Case reports in Kenema show a steady baseline with minor local clusters. Surveillance has been heightened. Local health centers are fully stocked with Artemether-Lumefantrine treatment courses. No immediate lockdown or emergency actions are required, but continuous monitoring is ongoing.'
      ],
      [
        'Weather Advisory', 'Port Loko', 
        'Heavy rainfall expected. Increased mosquito breeding risk.', 
        '8 hours ago', null, null, 'advisory',
        'Meteorological projections forecast 150mm of rainfall over the next week in Port Loko, likely causing standing water pools in low-elevation valleys. Community leaders are requested to initiate drainage clearing campaigns immediately. Insecticide distribution points have been set up at central community markets.'
      ],
      [
        'Treatment Shortage', 'Makeni City', 
        'Low stock of antimalarial medication. Resupply needed.', 
        '1 day ago', 52, 'increasing', 'warning',
        'Makeni Central Pharmacy reports inventory of primary antimalarial treatments has dropped below a 5-day buffer. Medical logistics is coordinating an emergency delivery from central stores. Patients seeking treatment are currently redirected to neighboring sub-clinics.'
      ],
      [
        'Community Alert', 'Bo Town', 
        'New cluster of cases identified in northern sector.', 
        '1 day ago', 31, 'increasing', 'warning',
        'Twelve households in the northern outskirts of Bo Town have reported malaria symptoms concurrently. Outdoor larval control spraying is scheduled for tomorrow morning. Families in the area are receiving free replacement insecticide-treated nets (ITNs).'
      ],
      [
        'Prevention Success', 'Freetown Rural', 
        'Mosquito net distribution campaign showing positive results.', 
        '2 days ago', 8, 'decreasing', 'success',
        'Following the distribution of 5,000 long-lasting insecticidal nets (LLINs) in Freetown Rural, active malaria cases have dropped by 65% over the past two weeks. Clinic consultation rates for fever symptoms have reached an all-time low for this season. Outstanding job by community health educators!'
      ]
    ];

    for (const item of alertsData) {
      await client.query(`
        INSERT INTO alerts (title, location, description, time_ago, cases_count, trend, type, details)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      `, item);
    }
    console.log(`Seeded ${alertsData.length} alerts.`);

    // 4. Seed courses
    const coursesData = [
      [
        'prevention', 'Malaria Prevention Basics', 
        'Learn fundamental prevention techniques and protective measures', 
        '5 lessons', '15 min', 100, 
        'This module covers: (1) Vector biology (Anopheles mosquitoes), (2) Insecticide-Treated Net (ITN) utilization guidelines, (3) Indoor Residual Spraying (IRS) logic, (4) Managing environmental pooling reservoirs, and (5) Personal protective repellents.'
      ],
      [
        'symptoms', 'Identifying Symptoms', 
        'Recognize early warning signs and when to seek medical help', 
        '4 lessons', '12 min', 55, 
        'This module covers: (1) Standard malaria presentation parameters (fever, chills, headache, nausea), (2) Differentiating uncomplicated malaria from severe conditions (cerebral anemia, respiratory distress), and (3) Rapid Diagnostic Testing (RDT) timelines.'
      ],
      [
        'community', 'Community Protection', 
        'Strategies for protecting your family and community', 
        '6 lessons', '20 min', 0, 
        'This module covers: (1) Local community surveillance organization, (2) Vector site elimination drives, (3) Safe municipal drainage techniques, and (4) Formulating regional protection plans for pregnant women and newborns.'
      ],
      [
        'treatment', 'Treatment & Care', 
        'Understanding malaria treatment and patient care', 
        '5 lessons', '18 min', 0, 
        'This module covers: (1) Artemisinin-based Combination Therapy (ACT) compliance, (2) Supportive care protocols (hydration, fever management), and (3) Hospital referral guidelines.'
      ]
    ];

    for (const item of coursesData) {
      await client.query(`
        INSERT INTO courses (id, title, description, lessons, duration, progress, details)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
      `, item);
    }
    console.log(`Seeded ${coursesData.length} courses.`);

    // 5. Seed videos
    const videosData = [
      ['How to Use Mosquito Nets', '1,234 views', '3:45', 'e8M8uQdJpXw', 'Step-by-step tutorial on installing, maintaining, and retreatment guidelines for long-lasting insecticidal nets.'],
      ['Preventing Mosquito Breeding', '2,156 views', '5:20', '2bN-0LptZ58', 'Identify and clear pooling water reservoirs, tire tracks, and open containers around community households.'],
      ['Recognizing Malaria Symptoms', '1,876 views', '4:15', 'S-qY3450q3Y', 'Differentiating general fatigue from severe symptoms that demand immediate clinical emergency transport.']
    ];

    for (const item of videosData) {
      await client.query(`
        INSERT INTO videos (title, views, duration, youtube_id, description)
        VALUES ($1, $2, $3, $4, $5)
      `, item);
    }
    console.log(`Seeded ${videosData.length} video tutorials.`);

    // 6. Seed achievements
    const achievementsData = [
      ['First Steps', 'Completed first course', true, 'text-orange-500 bg-orange-50 border-orange-100'],
      ['Knowledge Seeker', 'Completed 3 courses', false, 'text-gray-400 bg-gray-50 border-gray-100'],
      ['Quiz Master', 'Perfect score on 5 quizzes', true, 'text-orange-500 bg-orange-50 border-orange-100']
    ];

    for (const item of achievementsData) {
      await client.query(`
        INSERT INTO achievements (title, description, unlocked, color)
        VALUES ($1, $2, $3, $4)
      `, item);
    }
    console.log(`Seeded ${achievementsData.length} achievements.`);

    console.log('\nDatabase seeding completed successfully! All tables successfully populated.');
  } catch (err) {
    console.error('\nDatabase initialization error:');
    console.error(err.message);
    console.log('\nTroubleshooting:');
    console.log('1. Ensure PostgreSQL server is running locally or remotely.');
    console.log('2. Create the target database (e.g. `CREATE DATABASE malaria_guide;`).');
    console.log('3. Ensure credentials in your environment variables/DATABASE_URL are correct.');
  } finally {
    await client.end();
    console.log('Database connection closed.');
  }
}

run();
