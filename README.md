Program flow structure

Here is a sample README.md file for your project:

# Talent Verify

Talent Verify is a web application that helps companies verify the skills and qualifications of their employees.

## Features

* Employee profile management
* Skill verification
* Qualification verification
* History of employee updates

## Installation

1. Clone the repository: `git clone https://github.com/your-username/talent-verify.git`
2. Install dependencies: `pip install -r requirements.txt`
3. Run migrations: `python manage.py migrate`
4. Start the server: `python manage.py runserver`

## Usage

1. Create a new company:`http://localhost:8000/registerco`
    provide full needed unique infomation 

2. Add department:`http://localhost:8000/department'
    requires company_id to add department


3. Add First Employee:`http://localhost:8000/employees'
    provide accurate employee data or else it wont save
    validates employee id if he or she already exists 
    also an employee cant be added withoud company id and their department id

4. Create an account: `http://localhost:8000/register'
    requires unique employment id 
    requires company id related to that employment id 
    requires a unique email 
    requires unique username and password

5. Log in: `http://localhost:8000/login`
    login done using email and  password 


6. after login select navbar items "Admin Dashboard" or "Dashboard"
note : only authenticated users can access these dashboards

*admin dashboard manages the whole company records from users related to that company,departments and employees

Admin Dashboard Features :
    1. Add Employees link to add employees page 
    2. Add department link to add Departments 
    3. Employee Table : editabale , filtering , and deleting
    4. Departments table : editabale , filtering , and deleting
    5 User Table : editabale , filtering , and deleting
    6 history Table: filtering only cant be edited 
    &. Upload files button to upload  files with employee information or company Information 
* Dashboard is for user to manage and track their history , it provides user history and information which they can edit



## Signals

Signals are used to update the employee history when an employee's role or skills are updated.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request.

## License

This project is licensed under the MIT License.

