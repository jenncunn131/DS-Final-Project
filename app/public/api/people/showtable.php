<?php

require 'common.php';

// Only need this line if we're creating GUIDs (see comments below)
// use Ramsey\Uuid\Uuid;

// Step 0: Validate the incoming data
// This code doesn't do that, but should ...
// For example, if the date is empty or bad, this insert fails.

// As part of this step, create a new GUID to use as primary key (suitable for cross-system use)
// If we weren't using a GUID, allowing auto_increment to work would be best (don't pass `id` to `INSERT`)
// $guid = Uuid::uuid4()->toString(); // i.e. 25769c6c-d34d-4bfe-ba98-e0ee856f3e7a

// Step 1: Get a datase connection from our helper class
$db = DbConnection::getConnection();

// Step 2: Create & run the query
// Note the use of parameterized statements to avoid injection
$sql = 'SELECT * FROM People, Certification, Per_cert';
$vars = [];

if (isset($_GET['personID'])) {
  // This is an example of a parameterized query
  $sql = 'SELECT pc.expirationDate, c.certificationName
          FROM Per_cert pc, People p, Certifications c
          WHERE p.personID=pc.personID
          AND p.personID=?
          AND pc.certificationID = c.certificationID';
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
