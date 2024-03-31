<?php
include("dbconnect.php");

try{
    $query = "SELECT * FROM category";
    $statement = $connection->prepare($query);
    $statement->execute();
    $result = $statement->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($result);
}catch (PDOException $th ) {
    echo json_encode(['error' => $th->getMessage()]);
}
?>