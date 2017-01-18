<?php

require_once("./JKF_LibraryGame_Model.php");
require_once("./JKF_Const.php");

class JKF_Webservice_Get
{
  private $Model;
  private $Request_Data;

  private $User_Data;


	public function __construct(&$t_model, $t_request_data)
	{
    $this->Request_Data = $t_request_data;

    $this->Model = $t_model;
    $this->User_Data = $this->Model->User_Data;

  }

  public function compute()
  {
    if(!isset($this->Request_Data["dt"])) throw new Exception(gettext("No dt given"));

    $dt = strtolower($this->Request_Data["dt"]);

    if(isset($this->User_Data["user_id"]))
    {
        //Logged User
        if($dt == "user")
        {
          return $this->User_Data;
        }
        else if($dt == "tasks")
        {
          return $this->getTasks($this->User_Data["user_id"]);
        }
        else if($dt == "task" && isset($this->Request_Data["task_id"]))
        {
          return $this->getTask($this->Request_Data["task_id"], $this->User_Data["user_id"]);
        }
        else if($dt == "badge" && isset($this->Request_Data["badge_id"]))
        {
          return $this->getBadge($this->Request_Data["badge_id"], $this->User_Data["user_id"]);
        }
        else if($dt == "quest" && isset($this->Request_Data["quest_id"]))
        {
          return $this->getQuest($this->Request_Data["quest_id"], $this->User_Data["user_id"]);
        }
        else if($dt == "userprogress")
        {
          return $this->getUserProgress($this->User_Data["user_id"]);
        }
        else if($dt == "statistics")
        {
          return $this->getStatistics($this->User_Data["user_id"]);
        }
        else if($dt == "highscorelist")
        {
          return $this->getHighscorelist();
        }
        else if($dt == "tasksearch")
        {
          return $this->getTasksearch($this->User_Data["user_id"]);
        }
        else if($dt == "content")
        {
          return $this->getContent($this->User_Data["user_id"]);
        }
        else if($dt == "legal")
        {
          return $this->getLegal($this->User_Data["user_id"]);
        }
        else if($dt == "administrationcontent")
        {
          return $this->getAdministrationContent($this->User_Data["user_id"]);
        }
        else if($dt == "picture" && isset($this->Request_Data["picture_id"]))
        {
          return $this->Model->get_pictures_all_details($this->Request_Data["picture_id"]);
        }
        else if($dt == "checkusername" && isset($this->Request_Data["username"]))
        {
          if(strlen($this->Request_Data["username"]) == 0) return array("username" => "", "username_exists" => false);
          else return array("username" => $this->Request_Data["username"], "username_exists" => $this->Model->check_if_username_exists($this->Request_Data["username"]));
        }
        else if($dt == "checkemail" && isset($this->Request_Data["email"]))
        {
          if(strlen($this->Request_Data["email"]) == 0) return array("email" => "", "email_exists" => false);
          else return array("email" => $this->Request_Data["email"], "email_exists" => $this->Model->check_if_mail_exists($this->Request_Data["email"]));
        }
        else if($dt == "checklocation" && isset($this->Request_Data["lati"]) && isset($this->Request_Data["long"]) && isset($this->Request_Data["location_id"]))
        {
          return $this->checkLocation($this->User_Data["user_id"], $this->Request_Data["lati"], $this->Request_Data["long"], $this->Request_Data["location_id"]);
        }
    }
    else
    {
        //Unlogged User
        if($dt == "user")
        {
          return array();
        }
        else if($dt == "content")
        {
          return $this->getUnloggedContent();
        }
        else if($dt == "picture" && isset($this->Request_Data["picture_id"]))
        {
          return $this->Model->get_pictures_all_details($this->Request_Data["picture_id"]);
        }
        else if($dt == "checkusername" && isset($this->Request_Data["username"]))
        {
          if(strlen($this->Request_Data["username"]) == 0) return array("username" => "", "username_exists" => false);
          else return array("username" => $this->Request_Data["username"], "username_exists" => $this->Model->check_if_username_exists($this->Request_Data["username"]));
        }
        else if($dt == "checkemail" && isset($this->Request_Data["email"]))
        {
          if(strlen($this->Request_Data["email"]) == 0) return array("email" => "", "email_exists" => false);
          else return array("email" => $this->Request_Data["email"], "email_exists" => $this->Model->check_if_mail_exists($this->Request_Data["email"]));
        }

    }

  }

  protected function getTasks($user_id)
  {
    $UserData = $this->Model->get_users_all_details($user_id);
    $Return = array();
    $Return["Active_Tasks"] = $this->Model->get_tasks_all_details_active_tasks_for_user_id($user_id, $UserData["language"]);
    $Return["Active_Quests"] = $this->Model->get_quests_all_details_active_quests_for_user_id($user_id, $UserData["language"]);
    return $Return;
  }

  protected function getTask($task_id, $user_id)
  {
    $UserData = $this->Model->get_users_all_details($user_id);
    $Return = array();
    $Return["TASK_DATA"] = $this->Model->get_task_all_details_with_descriptions($task_id, $UserData["language"]);
    $Return["TASK_DATA"]["task_type_data"] = $this->Model->get_tasks_types_descriptions_description_only_with_fallback_language($Return["TASK_DATA"]["task_type_id"], $UserData["language"]);
    $Return["USER_TASK_SCORE"] = $this->Model->get_user_task_score_all_details($user_id, $task_id);
    $Return["QUESTS_CONTAINING_TASK_ID"] = $this->Model->get_quests_all_details_from_quest_containing_task_id($task_id);
    foreach ($Return["QUESTS_CONTAINING_TASK_ID"] as $key => $questArray)
    {
        $Return["QUESTS_CONTAINING_TASK_ID"][$key] = array_merge($Return["QUESTS_CONTAINING_TASK_ID"][$key], $this->Model->get_quests_descriptions_description_only_with_fallback_language($questArray["quest_id"], $UserData["language"]));
    }
    $Return["TASK_BLOCKED_DATA"] = $this->Model->get_blocked_tasks_all_details($user_id, $Return["TASK_DATA"]["task_id"]);
    return $Return;
  }

  protected function getBadge($badge_id, $user_id)
  {
    $Return = array();
    $Return["USER_DATA"] = $this->Model->get_users_all_details($user_id);
    $Return["BADGE_DATA"] = $this->Model->get_badge_all_details_with_descriptions($badge_id, $Return["USER_DATA"]["language"]);
    $Return["USER_BADGE"] = $this->Model->get_user_badge_all_details($user_id, $badge_id);
    $Return["PROGRESS_TASKS"] = $this->Model->get_badge_tasks_description_with_completion_statement($user_id, $badge_id, $Return["USER_DATA"]["language"]);
    return $Return;
  }

  protected function getQuest($quest_id, $user_id)
  {
    $Return = array();
    $Return["USER_DATA"] = $this->Model->get_users_all_details($user_id);
    $Return["QUEST_DATA"] = $this->Model->get_quest_all_details_with_descriptions($quest_id, $Return["USER_DATA"]["language"]);
    $Return["USER_QUEST"] = $this->Model->get_user_quest_all_details($user_id, $quest_id);
    $Return["PROGRESS_TASKS"] = $this->Model->get_quests_progress_for_quest_id_user_id($user_id, $quest_id, $Return["USER_DATA"]["language"]);
    $Return["PROGRESS_PRE_QUESTS"] = $this->Model->get_quest_pre_quests_description_with_completion_statement($user_id, $quest_id);
    return $Return;
  }

  protected function getUserProgress($user_id)
  {
    $Return = array();
    $Return["USER_DATA"] = $this->Model->get_users_all_details($user_id);
    $Return["USER_TASK_INFO"] = $this->Model->get_tasks_sorted_after_type_and_user_task_info_for_user_id($user_id, $Return["USER_DATA"]["language"]);
    $Return["COMPLETED_QUESTS"] = $this->Model->get_user_quest_all_completed_quests($user_id);
    foreach($Return["COMPLETED_QUESTS"] as $key => $value)
    {
        $Return["COMPLETED_QUESTS"][$key] = array_merge($Return["COMPLETED_QUESTS"][$key], $this->Model->get_quests_all_details($Return["COMPLETED_QUESTS"][$key]["quest_id"]));
        $Return["COMPLETED_QUESTS"][$key] = array_merge($Return["COMPLETED_QUESTS"][$key], $this->Model->get_quests_descriptions_description_only_with_fallback_language($Return["COMPLETED_QUESTS"][$key]["quest_id"], $Return["USER_DATA"]["language"]));
    }
    $Return["ALL_BADGES_WITH_COMPLETED_STATEMENT"] = $this->Model->get_badges_all_badge_data_with_all_descriptions();
    foreach($Return["ALL_BADGES_WITH_COMPLETED_STATEMENT"] as $key => $value)
    {
        $Return["ALL_BADGES_WITH_COMPLETED_STATEMENT"][$key]["completed"] = $this->Model->check_if_user_has_completed_badge($user_id, $Return["ALL_BADGES_WITH_COMPLETED_STATEMENT"][$key]["badge_id"]);
    }

    return $Return;
  }

  protected function getStatistics($user_id)
  {
    $Return = array();
    $Return["User"] = $this->Model->get_users_all_details($user_id);
    $Return["Statistics"] = array();
    $Return["Statistics"]["User_Statistic_1"] = $this->Model->get_statistic_all_details_from_user_id_and_statistic_type_id($user_id, 1);
    $Return["Statistics"]["User_Statistic_2"] = $this->Model->get_statistic_all_details_from_user_id_and_statistic_type_id($user_id, 2);
    $Return["Last_Completed_Quests"] = $this->Model->get_user_last_completed_quests_all_details($user_id, $Return["User"]["language"], 5);
    $Return["Last_Completed_Badges"] = $this->Model->get_user_last_completed_badges_all_details($user_id, $Return["User"]["language"], 5);
    $Return["Last_Completed_Tasks"] = $this->Model->get_user_last_completed_tasks_all_details($user_id, $Return["User"]["language"], 5);
    $Return["Faculties"] = $this->Model->get_faculties_all_all_details();
    $Return["Best_Users"] = $this->Model->get_users_all_details_after_score(5);
    $Return["Best_Users_For_Faculty"] = $this->Model->get_users_all_details_after_score_for_faculty_id($Return["User"]["faculty_id"], 5);
    $Return["Count_Badges"] = $this->Model->get_badges_count();
    $Return["Count_Quests"] = $this->Model->get_quests_count();
    return $Return;
  }

  protected function getHighscorelist()
  {
    return $this->Model->get_users_sorted_after_user_score();
  }

  protected function getTasksearch($user_id)
  {
    $UserData = $this->Model->get_users_all_details($user_id);
    $Return = array();
    $Return["ALL_LOCATIONS"] = $this->Model->get_locations_all_all_details();
    $Return["VISITED_LOCATION"] = array();
    foreach ($Return["ALL_LOCATIONS"] as $key => $value)
    {
        $Return["ALL_LOCATIONS"][$key] = array_merge($Return["ALL_LOCATIONS"][$key], $this->Model->get_locations_descriptions_description_only_with_fallback_language($Return["ALL_LOCATIONS"][$key]["location_id"], $UserData["language"]));
    }
    $Return["LOCATIONS_WHERE_USER_CAN_FIND_TASK_OR_QUEST"] = $this->Model->get_locations_with_description_where_user_id_can_find_tasks($user_id, $UserData["language"]);
    return $Return;
  }

  protected function getContent($user_id)
  {
    $UserData = $this->Model->get_users_all_details($user_id);
    $Return = array();
    $Return["_Content"] = $this->Model->get_content_universal($UserData["language"]);
    $Return["_Faculties"] = $this->Model->get_faculties_all_all_details();
    $Return["_Pictures"] = $this->Model->get_pictures_all_all_details();
    $Return["Anonymous_User_Phrase"] = JKF_Const::getFromINI("ANONYMOUS_USER_PHRASE");
    return $Return;
  }

  protected function getUnloggedContent()
  {
    $Return = array();
    $Return["_Content"] = $this->Model->get_content_universal("de_DE");
    $Return["_Faculties"] = $this->Model->get_faculties_all_all_details();
    return $Return;
  }

  protected function getLegal($user_id)
  {
    $UserData = $this->Model->get_users_all_details($user_id);
    $Return = array();
    $Return["TOU"] = $this->Model->get_content_all_details("TOU", $UserData["language"]);
    $Return["PP"] = $this->Model->get_content_all_details("PP", $UserData["language"]);
    $Return["IMPRESSUM"] = $this->Model->get_content_all_details("IMPRESSUM", $UserData["language"]);
    return $Return;
  }

  protected function getAdministrationContent($user_id)
  {
    $Return = array();
    $Return["_User"] = $this->Model->get_users_all_details($user_id);
    $Return["_All_Users"] = $this->Model->get_users_all($user_id);
    $Return["_Statistics"]["Administration_Statistic_1"] = $this->Model->get_statistics_administration_all_details_from_statistic_type_id(1);
    $Return["_Statistics"]["Administration_Statistic_2"] = $this->Model->get_statistics_administration_all_details_from_statistic_type_id(2);
    $Return["_Superadmins"] = $this->Model->get_users_all_superadmins();
    $Return["_Admins"] = $this->Model->get_users_all_admins();
    $Return["_Locations"] = $this->Model->get_locations_all_all_details();
    foreach ($Return["_Locations"] as $key => $locationArray)
    {
        $Return["_Locations"][$key] = array_merge($Return["_Locations"][$key], $this->Model->get_locations_descriptions_description_only_with_fallback_language($Return["_Locations"][$key]["location_id"], $Return["_User"]["language"]));
    }
    $Return["_Tasks"] = $this->Model->get_tasks_all_task_data_with_all_descriptions();
    $Return["_Badges"] = $this->Model->get_badges_all_badge_data_with_all_descriptions();
    $Return["_Quests"] = $this->Model->get_quests_all_all_details();
    foreach ($Return["_Quests"] as $key => $questArray)
    {
        $Return["_Quests"][$key] = array_merge($Return["_Quests"][$key], $this->Model->get_quests_descriptions_all_details_keyed_after_language($questArray["quest_id"]));
    }
    $Return["_Task_Types"] = $this->Model->get_tasks_types_all_task_types_with_description($Return["_User"]["language"]);

    $Return["Count_Active_Quests"] = $this->Model->get_quests_count();
    $Return["Count_Active_Tasks"] = $this->Model->get_tasks_count();
    $Return["Count_Active_Badges"] = $this->Model->get_badges_count();
    $Return["Count_Users"] = $this->Model->get_users_count();
    $Return["Count_Users_Active_Last_2_Days"] = $this->Model->get_users_count_active_last_days(2);
    $Return["Count_Users_Completed_All_Quests"] = $this->Model->get_users_count_completed_all_quests();
    $Return["Count_Users_Completed_All_Badges"] = $this->Model->get_users_count_completed_all_badges();

    return $Return;
  }

  protected function checkLocation($user_id, $lati, $long, $location_id)
  {
    $result = array();
    $geo_lati = filter_var($lati, FILTER_VALIDATE_FLOAT);
    $geo_long = filter_var($long, FILTER_VALIDATE_FLOAT);
    $t_location_id = filter_var($location_id, FILTER_VALIDATE_INT);

    $given_lovation_id_data = array();
    if($t_location_id != false && strlen($location_id."") > 0) {
      try {
        $given_lovation_id_data = $this->Model->get_locations_all_details($t_location_id);
      } catch(Exception $e) {
        $given_lovation_id_data = array();
      }
    }

    if(count($given_lovation_id_data) > 0) {
      $geo_lati = (float)$given_lovation_id_data["geo_lati"];
      $geo_long = (float)$given_lovation_id_data["geo_long"];
    }
    //$geo_lati = 49.4875;//49.4875;
    //$geo_long = 8.45657;//8.45657;

    //Check for float
    if(is_float($geo_lati) && is_float($geo_long))
    {
        
        //Check for tasks
        $new_tasks = $this->Model->check_for_new_tasks_with_location($user_id, $geo_lati, $geo_long);
        $new_quests = $this->Model->check_for_new_quests_with_location($user_id, $geo_lati, $geo_long);
        $all_tasks_to_solve_in_near = $this->Model->check_for_user_tasks_to_solve_with_location($user_id, $geo_lati, $geo_long);

        //Build $RESULT array
        $result["new_tasks"] = array();
        $result["new_quests"] = array();
        $result["all_tasks_to_solve_in_near"] = array();


        foreach ($new_tasks as $key => $taskArray)
        {
            $task_data = $this->Model->get_task_all_details_with_descriptions($taskArray["task_id"], "de_DE");
            $result["new_tasks"][] = array( "task_id" => $taskArray["task_id"],
                                            "score_rule" => $task_data["score_rule"],
                                            "description_long" => $task_data["description_long"],
                                            "taskname" => $task_data["taskname"]);
        }

        foreach ($new_quests as $key => $questArray)
        {
            $quest_data = $this->Model->get_quests_all_details($questArray["quest_id"]);
            $quest_data = array_merge($quest_data, $this->Model->get_quests_descriptions_description_only_with_fallback_language($questArray["quest_id"], "de_DE"));
            $result["new_quests"][] = array(    "quest_id" => $questArray["quest_id"],
                                                "score_rule" => $quest_data["score_rule"],
                                                "json_quest_task_ids" => $this->Model->get_quests_progress_for_quest_id_user_id($user_id, $questArray["quest_id"], "de_DE"),
                                                "questname" => $quest_data["questname"]);
        }

        foreach ($all_tasks_to_solve_in_near as $key => $taskArray)
        {
            $task_data = $this->Model->get_task_all_details_with_descriptions($taskArray["task_id"], "de_DE");

            //Solve Task
            $addedAchievements = $this->Model->add_task_progress_to_user($user_id, $taskArray["task_id"], 1);

            $t_achievementsAddedBySolvingTask = array(
              "tasks" => array(),
              "badges" => array(),
              "quests" => array()
            );

            foreach ($addedAchievements["tasks"] as $key2 => $taskId)
            {
                $t_achievementsAddedBySolvingTask["tasks"][] = array_merge(
                  $this->Model->get_tasks_all_details($taskId),
                  $this->Model->get_tasks_descriptions_description_only_with_fallback_language($taskId, "de_DE"));
            }
            foreach ($addedAchievements["badges"] as $key2 => $badgeId)
            {
                $t_achievementsAddedBySolvingTask["badges"][] = array_merge(
                  $this->Model->get_badges_all_details($badgeId),
                  $this->Model->get_badges_descriptions_description_only_with_fallback_language($badgeId, "de_DE"));
            }
            foreach ($addedAchievements["quests"] as $key2 => $questId)
            {
                $t_achievementsAddedBySolvingTask["quests"][] = array_merge(
                  $this->Model->get_quests_all_details($questId),
                  $this->Model->get_quests_descriptions_description_only_with_fallback_language($questId, "de_DE"));
            }
            //END: Solve Task

            //Add to result
            $result["all_tasks_to_solve_in_near"][] = array( "task_id" => $taskArray["task_id"],
                                            "score_rule" => $task_data["score_rule"],
                                            "added_score_for_faculty" => isset($t_achievementsAddedBySolvingTask["added_score_for_faculty"]) ? $t_achievementsAddedBySolvingTask["added_score_for_faculty"] : 0,
                                            "description_long" => $task_data["description_long"],
                                            "taskname" => $task_data["taskname"],
                                            "achievements" => $t_achievementsAddedBySolvingTask);
        }

    }

    return $result;
  }


}

?>
