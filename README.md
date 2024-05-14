Exercise 1  
Knowledge required: Databases  
  
Task:  
  
Design a calendar system which can allows the following:  
  
1 Events can be associated with a user or with a company - done  
2 Add simple event - done  
3 Change simple event date - done  
4 Add recurring event (supporting daily, weekly, bi-weekly, monthly) - done  
5 Change a date for an instance in a recurring event series - done  
6 Cancel an instance in a recurring event series - done  
7 Get all events in a time period (from date, to date) - done  

Guidelines:  
  
1 Suggest the db type - NoSQL vs SQL - done 
2 Provide the data structures (tables\collections) to support the above - done  
3 Provide the service interface for the above - done  
4 Explain the method used to manage recurring events and instances - done  
5 Do not create recurring events as multiple simple events - done  
  
Exercise 2  
Knowledge required: NestJS, jest   
  
Task:  
  
1 Write a NestJS controller endpoint and service to perform the changeEventDate API. -done  
2 Define the parameters required (note, changed event can be a simple event or part of a recurring series) - done  
3 Write the tested controller, dependent services and repositories for the test - partially done  
4 Controller is injected with 2 services (Calendar service based on the above interface, User service) - done  
5 Services use typeorm repositories for data access - done  
6 The tested code should not access the database - not done  
7 The test should check that N records were read from user repository  - not done  
8 The test should check that a record was updated in calendar repository - not done  

Due to episodical experience with testing, setting up testing infrastructure and designing test cases took me unreasonably
long time. Unfortunately I couldn't complete the requirements concerning code testing
