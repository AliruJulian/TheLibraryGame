<?php

ini_set('memory_limit', '256M');

require_once("./JKF_LibraryGame_Model.php");
require_once("./JKF_Const.php");
require_once("./JKF_Webservice_Get.php");
require_once("./JKF_Webservice_Set.php");


//Init Model
$model = new JKF_LibraryGame_Model();

//Return
$response = array();
$response["result"] = true;

foreach ($_REQUEST as $key => $value)
{
    if (get_magic_quotes_gpc())
    {
        $_REQUEST[$key] = stripslashes($_REQUEST[$key]);
    }

    $_REQUEST[$key] = trim($_REQUEST[$key]);
}


//Process Request
try {

  if ($model->check_user() && isset($_REQUEST["t"]))
  {
    $user_id = $model->get_user_id_from_session();

    if(strtolower($_REQUEST["t"])=="get")
    {
      $response["request"] = $_REQUEST;
      $webservice_get = new JKF_Webservice_Get($model, $_REQUEST);
      $response["data"] = $webservice_get->compute();

      //Special Case: Show Picture
      if($_REQUEST["dt"]=="picture" && isset($_REQUEST["picture_id"]) && count($response["data"])!=0) {

        header("Cache-Control: must-revalidate");
        header('ETag: '.md5($response["data"]['ts_upload']));
        if(isset($_SERVER['HTTP_IF_MODIFIED_SINCE']) || (isset($_SERVER['HTTP_IF_NONE_MATCH']) && $_SERVER['HTTP_IF_NONE_MATCH']==md5($response["data"]['ts_upload']))){
          header('HTTP/1.1 304 Not Modified');
          exit(0);
        }

        //Show Pic
        header("Content-type: ".$response["data"]['type']);
        echo $response["data"]["picture_data"];
        exit(0);
      }

    } // End $_REQUEST["t"]=="get"
    else if(strtolower($_REQUEST["t"])=="set")
    {
      $webservice_set = new JKF_Webservice_Set($model, $_REQUEST, $_FILES);
      $response["data"] = $webservice_set->compute();
    } // End $_REQUEST["t"]=="set"
    else if(strtolower($_REQUEST["t"])=="logout")
    {
      $model->logout_user();
    } // End $_REQUEST["t"]=="logout"
    else if(strtolower($_REQUEST["t"])=="status")
    {
      $response["logged"] = true;
    } // End $_REQUEST["t"]=="status"



  }
  else if(isset($_REQUEST["t"]))
  {
    if(strtolower($_REQUEST["t"])=="login")
    {

      if(isset($_REQUEST["username"]) && isset($_REQUEST["pwd"]))
      {
        $model->login_user($_REQUEST["username"], $_REQUEST["pwd"]);
      }

    } // End $_REQUEST["t"]=="login"
    else if(strtolower($_REQUEST["t"])=="loginanonym")
    {

      $anonymous_username = $model->create_new_anonymous_user();
      $model->login_anonymous_user($anonymous_username);

    } // End $_REQUEST["t"]=="loginanonym"
    else if(strtolower($_REQUEST["t"])=="fp" && isset($_REQUEST["email"]))
    {

      $response["result"] = $model->send_new_password_and_username_to_user($_REQUEST["email"]);

    } // End $_REQUEST["t"]=="fp"
    else if(strtolower($_REQUEST["t"])=="get")
    {
      $webservice_get = new JKF_Webservice_Get($model, $_REQUEST);
      $response["data"] = $webservice_get->compute();

      //Special Case: Show Picture
      if($_REQUEST["dt"]=="picture" && isset($_REQUEST["picture_id"]) && count($response["data"])!=0) {

        header("Cache-Control: must-revalidate");
        header('ETag: '.md5($response["data"]['ts_upload']));
        if(isset($_SERVER['HTTP_IF_MODIFIED_SINCE']) || (isset($_SERVER['HTTP_IF_NONE_MATCH']) && $_SERVER['HTTP_IF_NONE_MATCH']==md5($response["data"]['ts_upload']))){
          header('HTTP/1.1 304 Not Modified');
          exit(0);
        }

        //Show Pic
        header("Content-type: ".$response["data"]['type']);
        echo $response["data"]['picture_data'];
        exit(0);
      }

    } // End $_REQUEST["t"]=="get"
    else if(strtolower($_REQUEST["t"])=="set")
    {
      $webservice_set = new JKF_Webservice_Set($model, $_REQUEST, $_FILES);
      $response["data"] = $webservice_set->compute();

    } // End $_REQUEST["t"]=="set"
    else if(strtolower($_REQUEST["t"])=="status")
    {

      $response["logged"] = false;

    } // End $_REQUEST["t"]=="status"

  }
  else
  {
    throw new Exception("No normal request!");
  }


}
catch(Exception $e)
{
  $response["result"] = false;
  $response["message"] = $e->getMessage();
  $response["trace"] = $e->getTraceAsString();
  $response["line"] = $e->getLine();
}


print_r(json_encode($response));
?>
