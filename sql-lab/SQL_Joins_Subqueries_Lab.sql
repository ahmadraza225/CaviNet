-- =====================================================================
--  SQL LAB : JOINS, SUBQUERIES & CORRELATED SUBQUERIES
--  Target DBMS : Oracle Database (tested on Oracle Database 23ai Free)
--
--  Contents
--    0. Schema & sample data  (department, employee, employee_history, sales)
--    1. Part 1 - Joins        (3 queries)
--    2. Tasks 1 - 12          (subqueries, EXISTS / NOT EXISTS, IN / NOT IN,
--                              DML with subqueries, GROUP BY / HAVING)
--
--  Note: Tasks 5, 6 and 7 modify data and end with ROLLBACK, so every
--        task always runs against the original sample data.
-- =====================================================================


-- =====================================================================
--  0. SCHEMA & SAMPLE DATA
-- =====================================================================

CREATE TABLE department
(
    dept_id     NUMBER(10),
    dept_name   VARCHAR2(50) PRIMARY KEY,
    location    VARCHAR2(100)
);
INSERT INTO department VALUES (1, 'Admin', 'Bangalore');
INSERT INTO department VALUES (2, 'HR', 'Bangalore');
INSERT INTO department VALUES (3, 'IT', 'Bangalore');
INSERT INTO department VALUES (4, 'Finance', 'Mumbai');
INSERT INTO department VALUES (5, 'Marketing', 'Bangalore');
INSERT INTO department VALUES (6, 'Sales', 'Mumbai');

CREATE TABLE EMPLOYEE
(
    EMP_ID      NUMBER(10) PRIMARY KEY,
    EMP_NAME    VARCHAR2(50) NOT NULL,
    DEPT_NAME   VARCHAR2(50) NOT NULL,
    SALARY      NUMBER(12,2),
    CONSTRAINT fk_emp FOREIGN KEY (dept_name) REFERENCES department(dept_name)
);
INSERT INTO employee VALUES (101, 'Mohan', 'Admin', 4000);
INSERT INTO employee VALUES (102, 'Rajkumar', 'HR', 3000);
INSERT INTO employee VALUES (103, 'Akbar', 'IT', 4000);
INSERT INTO employee VALUES (104, 'Dorvin', 'Finance', 6500);
INSERT INTO employee VALUES (105, 'Rohit', 'HR', 3000);
INSERT INTO employee VALUES (106, 'Rajesh', 'Finance', 5000);
INSERT INTO employee VALUES (107, 'Preet', 'HR', 7000);
INSERT INTO employee VALUES (108, 'Maryam', 'Admin', 4000);
INSERT INTO employee VALUES (109, 'Sanjay', 'IT', 6500);
INSERT INTO employee VALUES (110, 'Vasudha', 'IT', 7000);
INSERT INTO employee VALUES (111, 'Melinda', 'IT', 8000);
INSERT INTO employee VALUES (112, 'Komal', 'IT', 10000);
INSERT INTO employee VALUES (113, 'Gautham', 'Admin', 2000);
INSERT INTO employee VALUES (114, 'Manisha', 'HR', 3000);
INSERT INTO employee VALUES (115, 'Chandni', 'IT', 4500);
INSERT INTO employee VALUES (116, 'Satya', 'Finance', 6500);
INSERT INTO employee VALUES (117, 'Adarsh', 'HR', 3500);
INSERT INTO employee VALUES (118, 'Tejaswi', 'Finance', 5500);
INSERT INTO employee VALUES (119, 'Cory', 'HR', 8000);
INSERT INTO employee VALUES (120, 'Monica', 'Admin', 5000);
INSERT INTO employee VALUES (121, 'Rosalin', 'IT', 6000);
INSERT INTO employee VALUES (122, 'Ibrahim', 'IT', 8000);
INSERT INTO employee VALUES (123, 'Vikram', 'IT', 8000);
INSERT INTO employee VALUES (124, 'Dheeraj', 'IT', 11000);

CREATE TABLE employee_history
(
    emp_id      NUMBER(10) PRIMARY KEY,
    emp_name    VARCHAR2(50) NOT NULL,
    dept_name   VARCHAR2(50),
    salary      NUMBER(12,2),
    location    VARCHAR2(100),
    CONSTRAINT fk_emp_hist_01 FOREIGN KEY (dept_name) REFERENCES department(dept_name),
    CONSTRAINT fk_emp_hist_02 FOREIGN KEY (emp_id) REFERENCES employee(emp_id)
);

CREATE TABLE sales
(
    store_id        NUMBER(10),
    store_name      VARCHAR2(50),
    product_name    VARCHAR2(50),
    quantity        NUMBER(10),
    price           NUMBER(12,2)
);
INSERT INTO sales VALUES (1, 'Apple Store 1', 'iPhone 13 Pro', 1, 1000);
INSERT INTO sales VALUES (1, 'Apple Store 1', 'MacBook pro 14', 3, 6000);
INSERT INTO sales VALUES (1, 'Apple Store 1', 'AirPods Pro', 2, 500);
INSERT INTO sales VALUES (2, 'Apple Store 2', 'iPhone 13 Pro', 2, 2000);
INSERT INTO sales VALUES (3, 'Apple Store 3', 'iPhone 12 Pro', 1, 750);
INSERT INTO sales VALUES (3, 'Apple Store 3', 'MacBook pro 14', 1, 2000);
INSERT INTO sales VALUES (3, 'Apple Store 3', 'MacBook Air', 4, 4400);
INSERT INTO sales VALUES (3, 'Apple Store 3', 'iPhone 13', 2, 1800);
INSERT INTO sales VALUES (3, 'Apple Store 3', 'AirPods Pro', 3, 750);
INSERT INTO sales VALUES (4, 'Apple Store 4', 'iPhone 12 Pro', 2, 1500);
INSERT INTO sales VALUES (4, 'Apple Store 4', 'MacBook pro 16', 1, 3500);
COMMIT;

--  PART 1 - JOINS

SELECT e.emp_name, e.salary, d.location
FROM employee e
JOIN department d ON e.dept_name = d.dept_name;


SELECT e.*
FROM employee e
JOIN department d ON e.dept_name = d.dept_name
WHERE d.location = 'Bangalore';


SELECT d.*
FROM department d
LEFT JOIN employee e ON d.dept_name = e.dept_name
WHERE e.emp_id IS NULL;

--  TASKS


-- TASK 1
SELECT *
FROM employee e
WHERE e.salary > (SELECT AVG(e2.salary)
                  FROM employee e2
                  WHERE e2.dept_name = e.dept_name)
  AND e.salary > (SELECT AVG(e3.salary)
                  FROM employee e3
                  WHERE e3.dept_name IN (SELECT d.dept_name
                                         FROM department d
                                         WHERE d.location = 'Bangalore'))
ORDER BY e.dept_name, e.salary;

-- TASK 2
SELECT *
FROM employee e
WHERE e.salary > (SELECT AVG(e2.salary)
                  FROM employee e2
                  WHERE e2.dept_name = e.dept_name)
  AND e.salary < (SELECT MAX(e3.salary)
                  FROM employee e3
                  WHERE e3.dept_name <> e.dept_name)
ORDER BY e.dept_name, e.salary;


--TASK 3 (1) NOT EXISTS
SELECT d.*
FROM department d
WHERE EXISTS (SELECT 1
              FROM employee e
              WHERE e.dept_name = d.dept_name)
  AND NOT EXISTS (SELECT 1
                  FROM employee e
                  WHERE e.dept_name = d.dept_name
                    AND e.salary > 8000);

--TASK 3 (2) NOT IN
SELECT d.*
FROM department d
WHERE d.dept_name IN (SELECT e.dept_name FROM employee e)
  AND d.dept_name NOT IN (SELECT e.dept_name
                          FROM employee e
                          WHERE e.salary > 8000);

-- EXPLANATION (Task 3: NOT IN vs NOT EXISTS with NULL):
-- * NOT EXISTS just checks if a matching row exists. NULLs don't matter.
-- * NOT IN compares with every value in the list. If the list has even one NULL, the comparison becomes UNKNOWN, so it returns ZERO rows.
-- * In our data dept_name is NOT NULL, so both give the same answer (Admin, HR, Finance).
-- * If NULLs are possible, use NOT EXISTS or add "IS NOT NULL" inside the NOT IN subquery.

-- TASK 4
SELECT *
FROM employee e
WHERE (SELECT COUNT(DISTINCT e2.salary)
       FROM employee e2
       WHERE e2.dept_name = e.dept_name
         AND e2.salary > e.salary) IN (1, 2)
ORDER BY e.dept_name, e.salary DESC;

--TASK 5
INSERT INTO employee_history (emp_id, emp_name, dept_name, salary, location)
SELECT e.emp_id,
       e.emp_name,
       e.dept_name,
       e.salary,
       (SELECT d.location FROM department d WHERE d.dept_name = e.dept_name)
FROM employee e
WHERE e.salary > (SELECT AVG(e2.salary)
                  FROM employee e2
                  WHERE e2.dept_name = e.dept_name)
  AND (SELECT SUM(e3.salary)
       FROM employee e3
       WHERE e3.dept_name = e.dept_name)
      > (SELECT AVG(t.dept_total)
         FROM (SELECT SUM(salary) AS dept_total
               FROM employee
               GROUP BY dept_name) t);

SELECT * FROM employee_history ORDER BY emp_id;
ROLLBACK;

-- TASK 6
UPDATE employee e
SET e.salary = e.salary * 1.15
WHERE e.salary < (SELECT AVG(e2.salary)
                  FROM employee e2
                  WHERE e2.dept_name = e.dept_name)
  AND (SELECT COUNT(*)
       FROM employee e3
       WHERE e3.dept_name = e.dept_name) >= 4
  AND e.dept_name IN (SELECT d.dept_name
                      FROM department d
                      WHERE d.location = 'Bangalore');

SELECT * FROM employee ORDER BY dept_name, emp_id;
ROLLBACK;

--TASK 7
DELETE FROM employee e
WHERE e.salary < (SELECT AVG(salary) FROM employee)
  AND (SELECT MAX(e2.salary)
       FROM employee e2
       WHERE e2.dept_name = e.dept_name) > 10000
  AND e.salary > (SELECT MIN(e3.salary)
                  FROM employee e3
                  WHERE e3.dept_name = e.dept_name);

SELECT * FROM employee ORDER BY dept_name, emp_id;
ROLLBACK;

-- TASK 8
SELECT dept_name,
       SUM(salary) AS total_salary,
       MAX(salary) AS max_salary
FROM employee
GROUP BY dept_name
HAVING SUM(salary) > (SELECT AVG(t.dept_total)
                      FROM (SELECT SUM(salary) AS dept_total
                            FROM employee
                            GROUP BY dept_name) t)
   AND MAX(salary) > (SELECT AVG(salary) FROM employee);

--  TASK 9
SELECT s.store_name,
       SUM(s.price)    AS total_revenue,
       SUM(s.quantity) AS total_quantity
FROM sales s
GROUP BY s.store_name
HAVING SUM(s.price) > (SELECT AVG(r.revenue)
                       FROM (SELECT SUM(price) AS revenue
                             FROM sales
                             GROUP BY store_name) r)
   AND SUM(s.quantity) > (SELECT AVG(q.qty)
                          FROM (SELECT SUM(quantity) AS qty
                                FROM sales
                                GROUP BY store_name) q)
   AND MAX(s.price) > (SELECT MAX(s2.price)
                       FROM sales s2
                       WHERE s2.store_name <> s.store_name);

--TASK 10
SELECT *
FROM employee e
WHERE (SELECT COUNT(*)
       FROM employee e2
       WHERE e2.dept_name = e.dept_name
         AND e2.salary < e.salary)
      >= 0.7 * (SELECT COUNT(*)
                FROM employee e3
                WHERE e3.dept_name = e.dept_name)
ORDER BY e.dept_name, e.salary;

-- TASK 11
SELECT emp.dept_name
FROM employee emp
GROUP BY emp.dept_name
HAVING (SELECT COUNT(*)
        FROM employee e
        WHERE e.dept_name = emp.dept_name
          AND e.salary > (SELECT AVG(e2.salary)
                          FROM employee e2
                          WHERE e2.dept_name = emp.dept_name)) > 2;

--TASK 12
-- Original query (IN):
SELECT *
FROM employee
WHERE dept_name IN (SELECT dept_name FROM department);

-- Rewritten query (EXISTS):
SELECT *
FROM employee e
WHERE EXISTS (SELECT 1
              FROM department d
              WHERE d.dept_name = e.dept_name);

-- EXECUTION LOGIC (Task 12: IN vs EXISTS):
-- * IN: inner query makes a list of dept names, then each employee is checked against that list.
-- * EXISTS: for each employee, it checks if a matching department row exists and stops at the first match.
-- * Oracle usually turns both into the same plan, so speed is about the same here.
-- * Better one: EXISTS. It handles NULLs safely and is good when the inner table is big.
-- * Here both give the same result (all 24 employees) because of the foreign key.
