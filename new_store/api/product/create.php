<?php
include('dbconnect.php');

$name = $_POST['name'];
$cat = $_POST['cat'];
$quan = $_POST['quan'];
$file = $_FILES['img'];

try {
    $filename = time() . '_' . basename($_FILES["img"]["name"]);
    $target_file = '../../uploads/' . $filename;
    move_uploaded_file($_FILES["img"]["tmp_name"], $target_file);

    $target_file = str_replace("../../", "", $target_file);

    $query = "INSERT INTO product (product_name, product_category, product_quantity, product_image)
            VALUES (:name, :category, :quantity, :picture)";
    $statement = $connection->prepare($query);
    $statement->bindParam(':name', $name);
    $statement->bindParam(':category', $cat);
    $statement->bindParam(':quantity', $quan);
    $statement->bindParam(':picture', $target_file);
    $res = $statement->execute();

    if ($res) {
        echo json_encode(['res' => 'success']);
    } else {
        echo json_encode(['res' => 'error']);
    }
} catch(PDOException $th) {
    echo json_encode(['error' => $th->getMessage()]);
}

?>
