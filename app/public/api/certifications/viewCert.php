<?php

require 'common.php';

// Step 1: Get a datase connection from our helper class
$db = DbConnection::getConnection();

// Step 2: Create & run the query
$sql = 'SELECT * FROM Certifications';
$vars = [];

if (isset($_GET['certificationID'])) {
  // This is an example of a parameterized query
  $sql = 'SELECT * FROM Certifications WHERE certificationID = ?';
  $vars = [ $_GET['certificationID'] ];
}

$stmt = $db->prepare($sql);
$stmt->execute($vars);

$certifications = $stmt->fetchAll();

// Step 3: Convert to JSON
$json = json_encode($certifications, JSON_PRETTY_PRINT);

// Step 4: Output
// header('Content-Type: application/json');
echo $json;
