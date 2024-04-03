<?php
include('dbconnect.php');

$id = $_GET['id'];
$current = $_GET['stock'];

try {
    $quantity = $current + 1;

    $query = "UPDATE product SET product_quantity = :quantity
              WHERE product_id = :id";
    $statement = $connection->prepare($query);
    $statement->bindParam(':quantity', $quantity);
    $statement->bindParam(':id', $id);
    $statement->execute();

    echo json_encode(["res" => "success"]);
} catch(PDOException $th) {
    echo json_encode(['error' => $th->getMessage()]);
}
?>
