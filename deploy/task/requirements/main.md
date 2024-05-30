Distributed Task Queue with Priority and Retry Mechanisms


Objective: Develop a distributed task queue system that supports priority tasks and automatic retries.

Requirements:

A REST API to:
 
Enqueue tasks with priority levels.
Dequeue tasks for workers to process.
Retrieve the status of tasks (pending, in-progress, completed, failed).
Use a message queue system like RabbitMQ or AWS SQS.
Implement task prioritization and ensure high-priority tasks are processed first.
Handle task retries with exponential backoff for transient failures.
Ensure data persistence and fault tolerance.

Optional Enhancements:
Add support for task scheduling (e.g., delayed tasks, cron-like scheduling).
Implement worker health checks and auto-scaling.
Provide monitoring and metrics for the task queue system.