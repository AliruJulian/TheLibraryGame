<?php

require_once("./JKF_LibraryGame_Model.php");
require_once("./JKF_Const.php");

class JKF_Webservice_Set
{
  private $Model;
  private $Request_Data;
  private $Request_Files;

  private $User_Data;


	public function __construct(&$t_model, $t_request_data, $t_request_files)
	{
    $this->Request_Data = $t_request_data;
    $this->Request_Files = $t_request_files;

    $this->Model = $t_model;
    $this->User_Data = $this->Model->User_Data;

  }

  public function compute()
  {
    if(!isset($this->Request_Data["dt"])) throw new Exception(gettext("No dt given"));

    $dt = strtolower($this->Request_Data["dt"]);

    if($dt == "password" && isset($this->User_Data["user_id"]) && isset($this->Request_Data["new_password"]) && isset($this->Request_Data["old_password"])) {
      return $this->updatePassword($this->User_Data["user_id"], $this->Request_Data["old_password"], $this->Request_Data["new_password"]);
    }
    else if(  $dt == "new_user" && !isset($this->User_Data["user_id"]) &&
              isset($this->Request_Data["username"]) &&
              isset($this->Request_Data["email"]) &&
              isset($this->Request_Data["password"]) &&
              isset($this->Request_Data["password_repeat"]) &&
              isset($this->Request_Data["faculty_id"]))
    {
      return $this->registerUserAndLogin($this->Request_Data["username"], $this->Request_Data["email"], $this->Request_Data["password"], $this->Request_Data["password_repeat"], $this->Request_Data["faculty_id"]);
    }
    else if(  $dt == "new_user" && isset($this->User_Data["user_id"]) &&
              isset($this->Request_Data["username"]) &&
              isset($this->Request_Data["email"]) &&
              isset($this->Request_Data["password"]) &&
              isset($this->Request_Data["password_repeat"]) &&
              isset($this->Request_Data["faculty_id"]))
    {
      return $this->registerAnonymousUser($this->User_Data["user_id"], $this->Request_Data["username"], $this->Request_Data["email"], $this->Request_Data["password"], $this->Request_Data["password_repeat"], $this->Request_Data["faculty_id"]);
    }
    else if(  $dt == "deleteuser" && isset($this->User_Data["user_id"]))
    {
      //$this->Model->logout_user();
      return $this->Model->delete_overall_user($this->User_Data["user_id"]);
    }
    else if( $dt == "generalcontent" && isset($this->User_Data["user_id"]) && ($this->User_Data["user_type_id"]==1 || $this->User_Data["user_type_id"]==2) &&
             isset($this->Request_Data["generalcontent"]))
    {
      $generalcontent = json_decode($this->Request_Data["generalcontent"], true);

      return $this->upsertGeneralContent($generalcontent);
    }
    else if( $dt == "task" && isset($this->User_Data["user_id"]) && ($this->User_Data["user_type_id"]==1 || $this->User_Data["user_type_id"]==2) &&
             isset($this->Request_Data["taskdata"]))
    {
      $taskdata = json_decode($this->Request_Data["taskdata"], true);

      $task_id = $this->upsertTask($taskdata);

      if($task_id == -1) throw new Exception(gettext("Error in saving task"));

      return $task_id;
    }
    else if( $dt == "badge" && isset($this->User_Data["user_id"]) && ($this->User_Data["user_type_id"]==1 || $this->User_Data["user_type_id"]==2) &&
             isset($this->Request_Data["badgedata"]))
    {
      $badgedata = json_decode($this->Request_Data["badgedata"], true);

      $badge_id = $this->upsertBadge($badgedata);

      if($badge_id == -1) throw new Exception(gettext("Error in saving badge"));

      return $badge_id;
    }
    else if( $dt == "quest" && isset($this->User_Data["user_id"]) && ($this->User_Data["user_type_id"]==1 || $this->User_Data["user_type_id"]==2) &&
             isset($this->Request_Data["questdata"]))
    {
      $questdata = json_decode($this->Request_Data["questdata"], true);

      $quest_id = $this->upsertQuest($questdata);

      if($quest_id == -1) throw new Exception(gettext("Error in saving quest"));

      return $quest_id;
    }
    else if( $dt == "location" && isset($this->User_Data["user_id"]) && ($this->User_Data["user_type_id"]==1 || $this->User_Data["user_type_id"]==2) &&
             isset($this->Request_Data["locationdata"]))
    {
      $locationdata = json_decode($this->Request_Data["locationdata"], true);

      $location_id = $this->upsertLocation($locationdata);

      if($location_id == -1) throw new Exception(gettext("Error in saving location"));

      return $location_id;
    }
    else if( $dt == "resetfacultyscore" && isset($this->User_Data["user_id"]) && ($this->User_Data["user_type_id"]==1 || $this->User_Data["user_type_id"]==2))
    {
      $this->Model->set_faculty_all_score_to_null();

      return true;
    }
    else if( $dt == "uploadpicture" && isset($this->User_Data["user_id"]) && ($this->User_Data["user_type_id"]==1 || $this->User_Data["user_type_id"]==2))
    {
      if( !isset($this->Request_Files) ||
          !isset($this->Request_Files["pictureupload"]) ||
          $this->Request_Files["pictureupload"]["size"] <= 0 ||
          $this->Request_Files["pictureupload"]["size"] > 14000000 ||
          !isset($this->Request_Data["picturename"])) {
        throw new Exception("REQUEST ERROR: Fehler bei Upload eines Bildes!");
      }

      $imagecontent = $this->getImageData($this->Request_Files["pictureupload"]);
      $imagecontent = addslashes($imagecontent);
      $picture_data = array(
        "picturename" => $this->Request_Data["picturename"],
        "type" => $this->Request_Files["pictureupload"]["type"],
        "picture_data" => $imagecontent
      );

      $this->insertPicture($picture_data);

      return true;
    }
    else if(  $dt == "addadmin" && isset($this->User_Data["user_id"]) && ($this->User_Data["user_type_id"]==1 || $this->User_Data["user_type_id"]==2) &&
              isset($this->Request_Data["user_id"]))
    {
      return $this->addAdmin($this->Request_Data["user_id"]);
    }
    else if(  $dt == "removeadmin" && isset($this->User_Data["user_id"]) && ($this->User_Data["user_type_id"]==1 || $this->User_Data["user_type_id"]==2) &&
              isset($this->Request_Data["user_id"]))
    {
      return $this->removeAdmin($this->Request_Data["user_id"]);
    }
    else if(  $dt == "sendemail" && isset($this->User_Data["user_id"]) && ($this->User_Data["user_type_id"]==1 || $this->User_Data["user_type_id"]==2) &&
              isset($this->Request_Data["headline"]) && isset($this->Request_Data["content"]))
    {
      return $this->sendEmailToAllUsers($this->Request_Data["headline"], $this->Request_Data["content"]);
    }
    else if(  $dt == "deletetask" && isset($this->User_Data["user_id"]) && ($this->User_Data["user_type_id"]==1 || $this->User_Data["user_type_id"]==2) &&
              isset($this->Request_Data["task_id"]))
    {
      return $this->Model->delete_overall_task($this->Request_Data["task_id"]);
    }
    else if(  $dt == "deletebadge" && isset($this->User_Data["user_id"]) && ($this->User_Data["user_type_id"]==1 || $this->User_Data["user_type_id"]==2) &&
              isset($this->Request_Data["badge_id"]))
    {
      return $this->Model->delete_overall_badge($this->Request_Data["badge_id"]);
    }
    else if(  $dt == "deletequest" && isset($this->User_Data["user_id"]) && ($this->User_Data["user_type_id"]==1 || $this->User_Data["user_type_id"]==2) &&
              isset($this->Request_Data["quest_id"]))
    {
      return $this->Model->delete_overall_quest($this->Request_Data["quest_id"]);
    }
    else if(  $dt == "deletelocation" && isset($this->User_Data["user_id"]) && ($this->User_Data["user_type_id"]==1 || $this->User_Data["user_type_id"]==2) &&
              isset($this->Request_Data["location_id"]))
    {
      return $this->Model->delete_overall_location($this->Request_Data["location_id"]);
    }
    else if(  $dt == "solvetask" && isset($this->User_Data["user_id"]) && isset($this->Request_Data["task_id"]) && isset($this->Request_Data["solvedata"]))
    {
      $this->Request_Data["solvedata"] = json_decode($this->Request_Data["solvedata"], true);
      return $this->solveTask($this->Request_Data["task_id"], $this->Request_Data["solvedata"], $this->User_Data["user_id"]);
    }


  }


  protected function updatePassword($user_id, $old_password, $new_password)
  {
    if(!$this->Model->check_users_password($user_id, $old_password))
    {
      throw new Exception("Fehler beim Setzen des neuen Passworts");
    }

    $this->Model->set_users_new_password($user_id, $new_password);

    return true;
  }

  protected function registerUserAndLogin($username, $email, $pwt, $pwt_repeat, $faculty_id)
  {
    $this->Model->check_for_registration($username, $email, $pwt, $pwt_repeat, $faculty_id);

    $this->Model->login_user($username, $pwt);

    return true;
  }

  protected function registerAnonymousUser($user_id, $username, $email, $pwt, $pwt_repeat, $faculty_id)
  {
    $this->Model->check_for_registration_for_anonymous_user($user_id, $username, $email, $pwt, $pwt_repeat, $faculty_id);

    $this->Model->login_user($username, $pwt);

    return true;
  }

  protected function upsertGeneralContent($generalcontent) {

    foreach ($generalcontent as $key => $value) {
      if(count($this->Model->get_content_all_details($key, "de_DE")) > 0) {

        $set_array = array(
          "text" => $value
        );

        $this->Model->set_content_data($set_array, $key, "de_DE");
      } else {
        $insert_array = array(
          "content_mapper" => $key,
          "text" => $value,
          "language" => "de_DE",
          "ts" => "NOW()"
        );

        $this->Model->insert_content_data($insert_array);
      }
    }

    return true;
  }

  protected function upsertTask($taskdata)
  {
    $task_id = -1;
    if(isset($taskdata["task_id"])) $task_id = $taskdata["task_id"];
    if(!isset($taskdata["is_task_active"])) return -1;
    if(!isset($taskdata["json_task_data"])) return -1;
    if(!isset($taskdata["location_id"])) return -1;
    if(!isset($taskdata["score_rule"])) return -1;
    if(!isset($taskdata["task_type_id"]) || !is_numeric($taskdata["task_type_id"])) return -1;
    if(!isset($taskdata["de_DE"])) return -1;
    if(!isset($taskdata["de_DE"]["description_long"])) return -1;
    if(!isset($taskdata["de_DE"]["solved_description"])) return -1;
    if(!isset($taskdata["de_DE"]["taskname"])) return -1;

    $json_task_data = array();

    if(intval($taskdata["task_type_id"]) == 1)
    {
      if(!isset($taskdata["json_task_data"]["de_DE"])) return -1;
      if(!isset($taskdata["json_task_data"]["de_DE"]["a1"])) return -1;
      if(!isset($taskdata["json_task_data"]["de_DE"]["a2"])) return -1;
      if(!isset($taskdata["json_task_data"]["de_DE"]["a3"])) return -1;
      if(!isset($taskdata["json_task_data"]["de_DE"]["a4"])) return -1;
      if(!isset($taskdata["json_task_data"]["de_DE"]["question"])) return -1;

      $json_task_data = array(
         "de_DE" => array(
           "question" => $taskdata["json_task_data"]["de_DE"]["question"],
           "a1" => $taskdata["json_task_data"]["de_DE"]["a1"],
           "a2" => $taskdata["json_task_data"]["de_DE"]["a2"],
           "a3" => $taskdata["json_task_data"]["de_DE"]["a3"],
           "a4" => $taskdata["json_task_data"]["de_DE"]["a4"]
         )
      );
    }
    else if(intval($taskdata["task_type_id"]) == 2)
    {
      if(!isset($taskdata["json_task_data"]["loc"])) return -1;

      $json_task_data = array(
         "loc" => $taskdata["json_task_data"]["loc"]
      );
    }
    else if(intval($taskdata["task_type_id"]) == 3)
    {
      if(!isset($taskdata["json_task_data"]["isbn"])) return -1;

      $json_task_data = array(
         "loc" => $taskdata["json_task_data"]["isbn"]
      );
    }
    else if(intval($taskdata["task_type_id"]) == 4)
    {
      if(!isset($taskdata["json_task_data"]["de_DE"])) return -1;
      if(!isset($taskdata["json_task_data"]["de_DE"]["s1"])) return -1;
      if(!isset($taskdata["json_task_data"]["de_DE"]["s2"])) return -1;
      if(!isset($taskdata["json_task_data"]["de_DE"]["s3"])) return -1;

      $json_task_data = array(
         "de_DE" => array(
           "s1" => $taskdata["json_task_data"]["de_DE"]["s1"],
           "s2" => $taskdata["json_task_data"]["de_DE"]["s2"],
           "s3" => $taskdata["json_task_data"]["de_DE"]["s3"]
         )
      );
    }
    else if(intval($taskdata["task_type_id"]) == 5)
    {
      if(!isset($taskdata["json_task_data"]["de_DE"])) return -1;
      if(!isset($taskdata["json_task_data"]["de_DE"]["answer"])) return -1;
      if(!isset($taskdata["json_task_data"]["de_DE"]["text"])) return -1;

      $json_task_data = array(
         "de_DE" => array(
           "answer" => $taskdata["json_task_data"]["de_DE"]["answer"],
           "text" => $taskdata["json_task_data"]["de_DE"]["text"]
         )
      );
    }
    else if(intval($taskdata["task_type_id"]) == 6)
    {
    }
    else
    {
      return -1;
    }

    $json_task_data = json_encode($json_task_data);

    if($task_id == -1)
    {
      $insert_array = array(
         "task_type_id" => $taskdata["task_type_id"],
         "location_id" => $taskdata["location_id"],
         "json_task_data" => $json_task_data,
         "needed_value" => 1,
         "score_rule" => $taskdata["score_rule"],
         "is_task_active" => 0
      );

      $task_id = $this->Model->insert_tasks_data($insert_array);

      //Table: _TASKS_DESCRIPTIONS
      //german
      $insert_array = array(
         "task_id" => $task_id,
         "language" => "de_DE",
         "taskname" => $taskdata["de_DE"]["taskname"],
         "description_long" => $taskdata["de_DE"]["description_long"],
         "solved_description" => $taskdata["de_DE"]["solved_description"]
      );
      $this->Model->insert_tasks_descriptions_data($insert_array);

    }
    else
    {
      $set_array = array(
         "task_id" => $task_id,
         "task_type_id" => $taskdata["task_type_id"],
         "location_id" => $taskdata["location_id"],
         "json_task_data" => $json_task_data,
         "score_rule" => $taskdata["score_rule"],
         "is_task_active" => $taskdata["is_task_active"]
      );

      $this->Model->set_tasks_data($set_array, $task_id);

      //Table: _TASKS_DESCRIPTIONS
      //german
      $set_array = array(
         "task_id" => $task_id,
         "language" => "de_DE",
         "taskname" => $taskdata["de_DE"]["taskname"],
         "description_long" => $taskdata["de_DE"]["description_long"],
         "solved_description" => $taskdata["de_DE"]["solved_description"]
      );
      $this->Model->set_tasks_descriptions_data($set_array, $task_id, "de_DE");
    }

    return $task_id;
  }

  protected function upsertBadge($badgedata)
  {
    $badge_id = -1;
    if(isset($badgedata["badge_id"])) $badge_id = $badgedata["badge_id"];
    if(!isset($badgedata["is_active"])) return -1;
    if(!isset($badgedata["picture_id"])) return -1;
    if(!isset($badgedata["json_task_ids"])) return -1;
    if(!isset($badgedata["de_DE"])) return -1;
    if(!isset($badgedata["de_DE"]["description_long"])) return -1;
    if(!isset($badgedata["de_DE"]["solved_description"])) return -1;
    if(!isset($badgedata["de_DE"]["badgename"])) return -1;

    $json_task_ids = json_encode($badgedata["json_task_ids"]);

    if($badge_id == -1)
    {
      $insert_array = array(
         "picture_id" => $badgedata["picture_id"],
         "json_task_ids" => $json_task_ids,
         "is_active" => 0
      );

      $badge_id = $this->Model->insert_badges_data($insert_array);

      $insert_array = array(
         "badge_id" => $badge_id,
         "language" => "de_DE",
         "badgename" => $badgedata["de_DE"]["badgename"],
         "description_long" => $badgedata["de_DE"]["description_long"],
         "solved_description" => $badgedata["de_DE"]["solved_description"]
      );
      $this->Model->insert_badges_descriptions_data($insert_array);

    }
    else
    {
      $set_array = array(
         "picture_id" => $badgedata["picture_id"],
         "json_task_ids" => $json_task_ids,
         "is_active" => $badgedata["is_active"]
      );

      $this->Model->set_badges_data($set_array, $badge_id);

      $set_array = array(
         "badge_id" => $badge_id,
         "language" => "de_DE",
         "badgename" => $badgedata["de_DE"]["badgename"],
         "description_long" => $badgedata["de_DE"]["description_long"],
         "solved_description" => $badgedata["de_DE"]["solved_description"]
      );
      $this->Model->set_badges_descriptions_data($set_array, $badge_id, "de_DE");
    }

    return $badge_id;
  }

  protected function upsertQuest($questdata)
  {
    $quest_id = -1;
    if(isset($questdata["quest_id"])) $quest_id = $questdata["quest_id"];
    if(!isset($questdata["is_active"])) return -1;
    if(!isset($questdata["is_starter_quest"])) return -1;
    if(!isset($questdata["location_id"])) return -1;
    if(!isset($questdata["score_rule"])) return -1;
    if(!isset($questdata["json_pre_quest_ids"])) return -1;
    if(!isset($questdata["json_quest_task_ids"])) return -1;
    if(!isset($questdata["de_DE"])) return -1;
    if(!isset($questdata["de_DE"]["solved_description"])) return -1;
    if(!isset($questdata["de_DE"]["questname"])) return -1;

    $json_pre_quest_ids = json_encode($questdata["json_pre_quest_ids"]);
    $json_quest_task_ids = json_encode($questdata["json_quest_task_ids"]);

    if($quest_id == -1)
    {
      $insert_array = array(
         "location_id" => $questdata["location_id"],
         "json_pre_quest_ids" => $json_pre_quest_ids,
         "json_quest_task_ids" => $json_quest_task_ids,
         "score_rule" => $questdata["score_rule"],
         "is_starter_quest" => $questdata["is_starter_quest"],
         "is_active" => 0
      );

      $quest_id = $this->Model->insert_quests_data($insert_array);

      $insert_array = array(
         "quest_id" => $quest_id,
         "language" => "de_DE",
         "questname" => $questdata["de_DE"]["questname"],
         "description_long" => "Not-implemented",
         "solved_description" => $questdata["de_DE"]["solved_description"]
      );
      $this->Model->insert_quests_descriptions_data($insert_array);

      //Push Quest if requested for it
      if($questdata["is_starter_quest"]."" == "1")
      {
          $this->Model->set_quest_active_for_all_users($quest_id);
      }

    }
    else
    {
      $set_array = array(
         "location_id" => $questdata["location_id"],
         "json_pre_quest_ids" => $json_pre_quest_ids,
         "json_quest_task_ids" => $json_quest_task_ids,
         "score_rule" => $questdata["score_rule"],
         "is_starter_quest" => $questdata["is_starter_quest"],
         "is_active" => $questdata["is_active"]
      );

      $this->Model->set_quests_data($set_array, $quest_id);

      $set_array = array(
         "quest_id" => $quest_id,
         "language" => "de_DE",
         "questname" => $questdata["de_DE"]["questname"],
         "description_long" => "Not-implemented",
         "solved_description" => $questdata["de_DE"]["solved_description"]
      );
      $this->Model->set_quests_descriptions_data($set_array, $quest_id, "de_DE");

      //Push Quest if requested for it
      if($questdata["is_starter_quest"]."" == "1")
      {
          $this->Model->set_quest_active_for_all_users($quest_id);
      }
    }

    return $quest_id;
  }

  protected function upsertLocation($locationdata)
  {
    $location_id = -1;
    if(isset($locationdata["location_id"])) $location_id = $locationdata["location_id"];
    if(!isset($locationdata["geo_lati"])) return -1;
    if(!isset($locationdata["geo_long"])) return -1;
    if(!isset($locationdata["geo_radius"])) return -1;
    if(!isset($locationdata["de_DE"])) return -1;
    if(!isset($locationdata["de_DE"]["locationname"])) return -1;

    if($location_id == -1)
    {
       $insert_array = array(
          "geo_lati" => $locationdata["geo_lati"],
          "geo_long" => $locationdata["geo_long"],
          "geo_radius" => $locationdata["geo_radius"]
       );

       $location_id = $this->Model->insert_locations_data($insert_array);

       $insert_array = array(
          "location_id" => $location_id,
          "language" => "de_DE",
          "locationname" => $locationdata["de_DE"]["locationname"],
          "description_long" => ""
       );
       $this->Model->insert_locations_descriptions_data($insert_array);

    }

    return $location_id;
  }

  protected function insertPicture($picturedata) {

    $insert_array_picture = array(
      "picturename" => $picturedata["picturename"],
      "picture_data" => $picturedata["picture_data"],
      "type" => $picturedata["type"],
      "ts_upload" => "NOW()"
    );

    return $this->Model->insert_pictures_data($insert_array_picture);
  }

  protected function addAdmin($user_id) {

    $set_array = array(
      "user_type_id" => 1
    );

    return $this->Model->set_users_data($set_array, $user_id);
  }

  protected function removeAdmin($user_id) {

    $set_array = array(
      "user_type_id" => 0
    );

    return $this->Model->set_users_data($set_array, $user_id);
  }

  protected function sendEmailToAllUsers($headline, $content) {

    if(strlen($headline) == 0) {
      return false;
    }

    if(strlen($content) == 0) {
      return false;
    }

    $users = $this->Model->get_users_all_with_all_details();

    foreach ($users as $key => $value) {

      if(strlen($value["email"]) > 0) {

        $to = $value["email"];
        $from = "From: ".JKF_Const::getFromINI("EMAIL_WHERE_ADMIN_MAILS_COME_FROM")."\n";
        $from .= "Reply-To: ".$value["email"]."\n";
        $from .= "Content-Type: text/html; charset=UTF-8\n";

        mail($to, $headline, $content, $from);
      }
    }

    return true;

  }

  protected function solveTask($task_id, $solvedata, $user_id) {

    //return
    $return = array();
    $return["tasks"] = array();
    $return["badges"] = array();
    $return["quests"] = array();


    //Get Task Data
    $taskdata = $this->Model->get_tasks_all_details($task_id);
    $taskdata["json_task_data"] = json_decode($taskdata["json_task_data"], true);

    $tasksolved = false;

    if($taskdata["task_type_id"] == 1 && isset($solvedata["chosenanswer"]))
    {
      if($solvedata["chosenanswer"] == "a1") $tasksolved = true;
    }
    else if($taskdata["task_type_id"] == 2)
    {

    }
    else if($taskdata["task_type_id"] == 3 && isset($solvedata["isbn"]))
    {
      if($solvedata["isbn"] == $taskdata["json_task_data"]["isbn"]) $tasksolved = true;
    }
    else if($taskdata["task_type_id"] == 4 && isset($solvedata["1"]) && isset($solvedata["2"]) && isset($solvedata["3"]))
    {
      if($solvedata["1"] == "s1" && $solvedata["2"] == "s2" && $solvedata["3"] == "s3") $tasksolved = true;
    }
    else if($taskdata["task_type_id"] == 5 && isset($solvedata["text"]))
    {
      if(trim(strtolower($solvedata["text"])) == trim(strtolower($taskdata["json_task_data"]["de_DE"]["answer"]))) $tasksolved = true;
    }
    else if($taskdata["task_type_id"] == 6)
    {
      if(trim(strtolower($solvedata["loc"])) == trim(strtolower($taskdata["json_task_data"]["loc"]))) $tasksolved = true;
    }

    if( $tasksolved == true &&
        !$this->Model->check_if_task_is_blocked_for_user_id($user_id, $task_id) &&
        !$this->Model->has_user_completed_task($user_id, $task_id))
    {
      //Task solved
      $return["task_solved"] = true;

      $addedAchievements = $this->Model->add_task_progress_to_user($user_id, $task_id, 1);

      foreach ($addedAchievements["tasks"] as $key => $taskId)
      {
          $return["tasks"][] = array_merge(
            $this->Model->get_tasks_all_details($taskId),
            $this->Model->get_tasks_descriptions_description_only_with_fallback_language($taskId, "de_DE"));
      }
      foreach ($addedAchievements["badges"] as $key => $badgeId)
      {
          $return["badges"][] = array_merge(
            $this->Model->get_badges_all_details($badgeId),
            $this->Model->get_badges_descriptions_description_only_with_fallback_language($badgeId, "de_DE"));
      }
      foreach ($addedAchievements["quests"] as $key => $questId)
      {
          $return["quests"][] = array_merge(
            $this->Model->get_quests_all_details($questId),
            $this->Model->get_quests_descriptions_description_only_with_fallback_language($questId, "de_DE"));
      }
    }
    else
    {
      //Task not solved
      $return["task_solved"] = false;

    }

    return $return;
  }


  //
  //HELPER
  //
  protected function getImageData($file) {

    $originalPic=FALSE;
    if(strtolower($file["type"])=="image/jpg" || strtolower($file["type"])=="image/jpeg")
    {
      ob_flush();
      ob_start();
        imagejpeg(imagecreatefromjpeg($file['tmp_name']));
      return ob_get_clean();
    }
    else if(strtolower($file["type"])=="image/gif")
    {
      ob_flush();
      ob_start();
        imagegif(imagecreatefromgif($file['tmp_name']));
      return ob_get_clean();
    }
    else if(strtolower($file["type"])=="image/png")
    {
      ob_flush();
      ob_start();
        imagepng(imagecreatefrompng($file['tmp_name']));
      return ob_get_clean();
    }

  }




}

?>
