<?php
include_once("dbconnect.php");

$id = $_POST['id'];
$name = $_POST['name'];

try {
    $query = "UPDATE category SET category_name = :name WHERE category_id = :id";
    $statement = $connection->prepare($query);
    $statement->bindParam(':id', $id);
    $statement->bindParam(':name', $name);
    $statement->execute();

    echo json_encode(["res" => "success"]);
} catch(PDOException $th) {
    echo json_encode(['error' => $th->getMessage()]);
}
?>