<html>
<head>
</head>
<body>
<?php
 $file = fopen("borderBase.txt","r")or die("no file");
 $eventType = fgets($file);
 $maxC = fgets($file);
 $cbBonus = 0;
 $Line1 = fgets($file);
 $Line2 = fgets($file);
 $Line3 = fgets($file);
 if($maxC<=50)$cbBonus=$maxC;
 else if($maxC<=100)$cbBonus=$maxC*1.1-5;
 else if($maxC<=200)$cbBonus=$maxC*1.15-10;
 else if($maxC<=400)$cbBonus=$maxC*1.2-20;
 else if($maxC<=600)$cbBonus=$maxC*1.25-40;
 else if($maxC<=800)$cbBonus=$maxC*1.3-70;
 else $cbBonus=$maxC*1.35-110;
 $arr = 1;
 if($eventType[0]=='I')$arr=1.13;
 if($eventType[0]=='M')$arr=1.13;
 if($eventType[0]=='C')$arr=1.1;
 if($eventType[0]=='S')$arr=1.13;
 if($eventType[0]=='N')$arr=1.21;

 $Score1 = round($Line1 * $arr * $cbBonus);
 $Score2 = round($Line2 * $arr * $cbBonus);
 $Score3 = round($Line3 * $arr * $cbBonus);
 echo "arr=".$arr."<br>";
 echo "<strong></strong><br>";
 echo "当前活动类型：".$eventType."<br>";
 echo "最高Combo：".$maxC."<br>";
 echo "一档预测线：".$Score1."<br>";
 echo "二档预测线：".$Score2."<br>";
 echo "三档预测线：".$Score3."<br>";
?>
</body>
</html>