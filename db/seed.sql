INSERT INTO departments (department_name)
VALUES ( "Science"),
       ( "Mathematics"),
       ( "Carpentry"),
       ( "Gymnastics"),
       ( "Competitive Painting"),
       ("Jello Studies");
       
INSERT INTO employee_roles (id, title, salary, department_id)
VALUES 
 (1, "CEO", 330000.00, 5),
 (2, "Intern", 0.00, 6),
 (3, "Minister of jello", 500000.00, 6),
 (4, "The Science Guy", 1500000.00, 1),
 (5, "Senior Managing Manager", 33433.00, 2),
 (6, "Junior jello trainee", 3.00, 6),
 (7, "Coffee getter", 0.02, 4);

 INSERT INTO employees(first_name, last_name, role_id)
 VALUES("anthony","rooyakkers",1),("bill","nye",2);
       