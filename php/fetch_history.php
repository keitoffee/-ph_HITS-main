
<?php 
    include("includes/db.php");
    include("includes/header.html");
    $query ="SELECT DATE_FORMAT(streamDate, '%M %e, %Y') AS formattedDate FROM `history` ORDER BY streamDate ASC";
    $stmt =$db->prepare($query);
    if($stmt ===false){
        echo json_encode(['error' => 'Error in query: ' . $db->error]);
    }else{
        $stmt->execute();
        $stmt->bind_result($date);
        $result = [];

        while($stmt->fetch()){
           $result[] =['date'=> $date];
        }
        $stmt->close();
    }

    $db->close();
    header('Content-Type: application/json');
    echo json_encode($result);

?>

