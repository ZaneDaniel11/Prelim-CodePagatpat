<?php
include_once("dbconnect.php");

if (isset($_POST['id'])) {
    $id = $_POST['id'];

    $query = "DELETE FROM category WHERE category_id = ?";
    $statement = $connection->prepare($query);
    $statement->execute([$id]);

    if ($statement->rowCount() > 0) {
        echo json_encode(['res' => 'success']);
    } else {
        echo json_encode(['res' => 'error', 'message' => 'Category not found']);
    }
} else {
    echo json_encode(['res' => 'error', 'message' => 'Category ID not provided']);
}
