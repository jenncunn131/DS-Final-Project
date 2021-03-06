<?php

require 'common.php';

// Step 1: Get a datase connection from our helper class
$db = DbConnection::getConnection();

// Step 2: Create & run the query
$sql = 'SELECT p.fname, p.lname, pc.expirationDate, c.certificationName
FROM Per_cert pc, People p, Certifications c
WHERE pc.personID = p.personID
AND pc.certificationID = c.certificationID
AND pc.expirationDate < now()';
$vars = [];

if (isset($_GET['personID'])) {
  // This is an example of a parameterized query
  $sql = 'SELECT * FROM People WHERE personID = ?';
  $vars = [ $_GET['personID'] ];
}

$stmt = $db->prepare($sql);
$stmt->execute($vars);

$people = $stmt->fetchAll();

// Step 3: Convert to JSON
$json = json_encode($people, JSON_PRETTY_PRINT);

// Step 4: Output
// header('Content-Type: application/json');
echo $json;
