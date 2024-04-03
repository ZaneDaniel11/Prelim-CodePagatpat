<?php
include('dbconnect.php');

$id = $_POST['id'];
$name = $_POST['name'];
$category = $_POST['cat'];
$quantity = $_POST['stock'];
$file = $_FILES['img'];

try {
    $filename = time() . '_' . basename($_FILES["img"]["name"]);
    $target_file = '../../uploads/' . $filename;
    move_uploaded_file($_FILES["img"]["tmp_name"], $target_file);

    $target_file = str_replace("../../", "", $target_file);

    $query = "UPDATE product
              SET product_name = :name, product_category = :category, product_quantity = :quantity, product_image = :picture
              WHERE product_id = :id";
    $statement = $connection->prepare($query);
    $statement->bindParam(':id', $id);
    $statement->bindParam(':name', $name);
    $statement->bindParam(':category', $category);
    $statement->bindParam(':quantity', $quantity);
    $statement->bindParam(':picture', $target_file);
    $statement->execute();

    echo json_encode(["res" => "success"]);
} catch(PDOException $th) {
    echo json_encode(['error' => $th->getMessage()]);
}
?>
