# User Guide for Admin

## Description
The admin account is used to manage user account information for all users of the application. The admin account username and password are created directly in the Microsoft SQL database. Upon login and successful authentication, the admin is directed to the admin page to manage user accounts.

## Roles
- Supervisor: Refers to the supervisor of a department, usually the person who either collates expenses for his employees to submit on their behalf for group monthly claim, or creates a group monthly claim for his employees to join and add their own expenses
- Approver: Refers to HOD and above, who approves claims from Supervisors or individual employees. Take note that there can be multiple levels of approval.
- Processor: Finance personnel who processes the claims of the company that they are attached to.

## Admin Account Setup
Insert into **'SystemAdmins'** table the username and password in **ECLAIM** database. These are the credentials of the admin account.

## Admin Functions
1. **Add User**
- Admin can add a new employee for him/her to submit eclaims by filling in all of the required information
2. **Edit User**
- Admin can edit the user information of any employee, such as the name and company, and also change their access roles, such as being approvers, processors and supervisors
- For example, admin can replace old supervisor, approver or processor, or change the name or company of the employee, etc.
3. **Delete User**
- Admin can delete users who have left the company

## User Information
1. Name of employee
2. Company that employee belongs to
3. Departments that employee belongs to *
- Departments must be created for Eddie and Paul first, as they are highest level of approvers.
- "Insert into Departments VALUES ('(eddie's email)', 1), ('(paul's email)', 1)" to be executed on the ECLAIM SQL database.
4. Company email of employee * (cannot be edited)
5. Supervisor check * 
6. Approver check * 
7. Processor check * 

## Restrictions
1. Each department should have only one supervisor
2. Each department should have only one approver, but there can be multiple levels of approvals required for a department.
3. Each company should have only one processor from Finance attached.
4. Company email cannot be edited once user is created.
5. When a new approver is added, a new department will be automatically created with the department name being his/her email. Only the new approver will belong to this department.


