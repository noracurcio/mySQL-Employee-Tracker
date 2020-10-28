INSERT INTO department (name)
VALUES ("HR"),("Sales"),("Marketing"),("Accounting"),("Legal");

INSERT INTO role (title, salary, department_id)
VALUES ("HR Representitive", 45000, 1), ("VP of Sales", 100000, 2), ("Marketing Director", 60000, 3),("Accountant", 40000, 4) ("Lawyer", 100000, 5);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Bob", "Saget", 1, null), ("Brian", "Ford", 2, 1), ("Kelly", "Car", 3, 2), ("Nora", "Curcio" 4, 5), ("Edward", "Scissorhands", 5, null);