## Adam Food
### Challenge
* Enqueue tasks with priority levels.
* Dequeue tasks for workers to process.
* Retrieve the status of tasks (pending, in-progress, completed, failed).
* Use a message queue system like RabbitMQ or AWS SQS.
* Implement task prioritization and ensure high-priority tasks are processed first.
* Handle task retries with exponential backoff for transient failures.
* Ensure data persistence and fault tolerance.
* Add support for task scheduling (e.g., delayed tasks, cron-like scheduling).
* Implement worker health checks and auto-scaling.
* Provide monitoring and metrics for the task queue system.

### Language
* Typescript
* Vanilla JS
* NodeJS
* Kubernetes

### Message System
* RabbitMQ

### Libs
* PG
* Node-cron
* Chalk
* Express
* Amqplib

### Database
* Postgres

## Features
* Create new task (ordering, notify_customer, inventary)
* Load tasks
* Load task by id

### Endpoints
* http://localhost:3000/api/task/create
* http://localhost:3000/api/task/load
* http://localhost:3000/api/task/loadbyid

### Requirements
* For creating a task, parametes are required
  - taskType: Enumerated['ordering', 'notify_customer', 'inventary']
  - idCustumer: string
* For loading task by id
  - id: string

### Performance report
* npm run test-performance
