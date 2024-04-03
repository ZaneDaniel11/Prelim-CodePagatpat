<?php
include('dbconnect.php');


    $id = $_GET['id'];

    $query = "DELETE FROM product WHERE product_id = $id";
    $statement = $connection->prepare($query);
    $statement->execute();

    if ($statement->rowCount() > 0) {
        echo json_encode(['res' => 'success']);
    } else {
        echo json_encode(['res' => 'error', 'message' => 'Category not found']);
    }
?>
