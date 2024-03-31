<?php
include('dbconnect.php');

$query = "INSERT INTO category(category_name) VALUE ('" . $_GET['name'] . "')";
$statement = $connection->prepare($query);
$res = $statement->execute();

if ($res) {
    echo json_encode(['res' => 'success']);
} else {
    echo json_encode(['res' => 'error']);
}
