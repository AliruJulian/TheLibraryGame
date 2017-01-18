<?php

/*
  Extention to the JKF_Model
 */

require_once("./JKF_Const.php");
require_once("./JKF_Model.php");


class JKF_LibraryGame_Model extends JKF_Model
{
    private $DB = "";
    private $Tables_Faculties = "_Faculties";
    private $Tables_Locations = "_Locations";
    private $Tables_Mapping_User_Types = "_Mapping_User_Types";
    private $Tables_Statistics = "_Statistics";
    private $Tables_Statistics_Administration = "_Statistics_Administration";
    private $Tables_Tasks = "_Tasks";
    private $Tables_Tasks_Types = "_Tasks_Types";
    private $Tables_Users = "_Users";
    private $Tables_User_Task_Score = "_User_Task_Score";
    private $Tables_Faq = "_Faq";
    private $Tables_Faculties_Descriptions = "_Faculties_Descriptions";
    private $Tables_Locations_Descriptions = "_Locations_Descriptions";
    private $Tables_Tasks_Descriptions = "_Tasks_Descriptions";
    private $Tables_Tasks_Types_Descriptions = "_Tasks_Types_Descriptions";
    private $Tables_Badges = "_Badges";
    private $Tables_Badges_Descriptions = "_Badges_Descriptions";
    private $Tables_User_Badge = "_User_Badge";
    private $Tables_Content = "_Content";
    private $Tables_Quests = "_Quests";
    private $Tables_User_Quest = "_User_Quest";
    private $Tables_Daily_Tasks = "_Daily_Tasks";
    private $Tables_Blocked_Tasks = "_Blocked_Tasks";
    private $Tables_Quests_Descriptions = "_Quests_Descriptions";
    private $Tables_User_Session = "_User_Session";
    private $Tables_Pictures = "_Pictures";

    public static $Anonymous_User_Phrase = "YouAreAnAnonymousUser";
    public static $Anonymous_User_Inactive_Days_to_Delete_User = 30;

    private $NotAllowedCharacters = array(',',';','"');

    public static $TimeInSecondsUntilAMultipleSolvableTaskIsAgainSolvable = 1800;
    public $User_Data;

    public static function getAnonymousUserPhrase()
    {
        return self::$Anonymous_User_Phrase;
    }

    public function __construct()
    {
        parent::__construct();
        $this->User_Data = array();

        JKF_LibraryGame_Model::$Anonymous_User_Phrase = JKF_Const::getFromINI("ANONYMOUS_USER_PHRASE");
        JKF_LibraryGame_Model::$Anonymous_User_Inactive_Days_to_Delete_User = JKF_Const::getFromINI("ANONYMOUS_USER_INACTIVE_DAYS_TO_DELETE_USER");

    }

    //
    //TABLES_USERS
    //
    //public function insert_users_data($insert_array)
    //public function get_users_username($user_id)
    //public function get_users_user_id($username)
    //public function get_users_all_details($user_id)
    //public function set_users_data($set_array, $user_id)
    //public function delete_users($user_id)
    //public function get_users_count()
    //public function get_users_count_for_faculty_id($faculty_id)
    //public function delete_users_task_id_from_json_active_task_ids($task_id)
    //public function delete_users_quest_id_from_json_active_quest_ids($quest_id)
    //public function get_users_count_active_last_days($days)
    //public function get_users_all_users_containing_username($username)
    //public function get_users_all_admins()
    //public function get_users_all_superadmins()
    //public function get_users_all_not_online_last_days($days)
    //public function get_users_all_last_online_within_days($days)
    //public function check_users_password($user_id, $password)
    //public function set_users_new_password($user_id, $password)
    //public function get_users_all();
    //public function get_users_all_with_all_details();


    public function insert_users_data($insert_array)
    {
        $this->get_next_free_id($insert_array["user_id"], $this->Tables_Users, "user_id");

        $sql_query = "INSERT INTO ".$this->Tables_Users." (".join(array_keys($insert_array),',').") VALUES (".$this->get_string_of_join_sql_values($insert_array).")";

        $this->get_result_from_query_on_database($sql_query);

        return $insert_array["user_id"];
    }

    public function get_users_username($user_id)
    {
        $sql_query = "SELECT username FROM ".$this->Tables_Users." WHERE user_id='".$user_id."'";

        $result =& $this->get_result_from_query_on_database($sql_query);

        if($result->num_rows==0) {throw new Exception("ERROR IN ".__FUNCTION__.": User unknown!");}

        $row = $result->fetch_array(MYSQLI_ASSOC);

        $result->close();

        return $row["username"];
    }

    public function get_users_user_id($username)
    {
        $sql_query = "SELECT user_id FROM ".$this->Tables_Users." WHERE username='".$username."'";

        $result =& $this->get_result_from_query_on_database($sql_query);

        if($result->num_rows==0) {throw new Exception("ERROR IN ".__FUNCTION__.": User unknown!");}

        $row = $result->fetch_array(MYSQLI_ASSOC);

        $result->close();

        return $row["user_id"];
    }

    public function get_users_all_details($user_id)
    {
        $sql_query = "SELECT * FROM ".$this->Tables_Users." WHERE user_id='".$user_id."'";

        $result =& $this->get_result_from_query_on_database($sql_query);

        if($result->num_rows==0) {throw new Exception("ERROR IN ".__FUNCTION__.": User unknown!");}

        $row = $result->fetch_array(MYSQLI_ASSOC);

        $result->close();

        return $row;
    }

    public function set_users_data($set_array, $user_id)
    {
        $sql_query = "UPDATE ".$this->Tables_Users." SET ".$this->get_string_of_update_sql_values($set_array)." WHERE user_id=".$user_id;

        $result =& $this->get_result_from_query_on_database($sql_query);

        return true;
    }

    public function delete_users($user_id)
    {
        $sql_query="DELETE FROM ".$this->Tables_Users." WHERE user_id='".$user_id."'";

        $result =& $this->get_result_from_query_on_database($sql_query);

        return true;
    }

    public function get_users_count()
    {
        $sql_query = "SELECT COUNT(*) FROM ".$this->Tables_Users;

        $result =& $this->get_result_from_query_on_database($sql_query);

        $row = $result->fetch_array(MYSQLI_ASSOC);


        $result->close();

        return $row["COUNT(*)"];
    }

    public function get_users_count_for_faculty_id_active_last_days($faculty_id, $days)
    {
        $sql_query = "SELECT COUNT(*) FROM ".$this->Tables_Users." WHERE faculty_id='".$faculty_id."' AND DATEDIFF(NOW(),ts_active) <= ".$days;

        $result =& $this->get_result_from_query_on_database($sql_query);

        $row = $result->fetch_array(MYSQLI_ASSOC);


        $result->close();

        return $row["COUNT(*)"];
    }

    public function get_users_count_active_last_days($days)
    {
        $sql_query = "SELECT COUNT(*) FROM ".$this->Tables_Users." WHERE DATEDIFF(NOW(),ts_active) <= ".$days;

        $result =& $this->get_result_from_query_on_database($sql_query);

        $row = $result->fetch_array(MYSQLI_ASSOC);


        $result->close();

        return $row["COUNT(*)"];
    }

    public function delete_users_task_id_from_json_active_task_ids($task_id)
    {
        $sql_query = "SELECT user_id,json_active_task_ids FROM ".$this->Tables_Users." WHERE json_active_task_ids LIKE '%".$task_id."%'";

        $result =& $this->get_result_from_query_on_database($sql_query);

        while($row = $result->fetch_array(MYSQLI_ASSOC))
        {
            $row["json_active_task_ids"] = json_decode($row["json_active_task_ids"], true);

            foreach ($row["json_active_task_ids"] as $key => $value)
            {
                if($value==$task_id)
                {
                    $row["json_active_task_ids"][$key] = NULL;
                    unset($row["json_active_task_ids"][$key]);
                }
            }

            $row["json_active_task_ids"] = json_encode($row["json_active_task_ids"]);

            $set_array = array("json_active_task_ids" => $row["json_active_task_ids"]);
            $this->set_users_data($set_array, $row["user_id"]);
        }


        $result->close();

        return true;
    }

    public function delete_users_quest_id_from_json_active_quest_ids($quest_id)
    {
        $sql_query = "SELECT user_id,json_active_quest_ids FROM ".$this->Tables_Users." WHERE json_active_quest_ids LIKE '%".$quest_id."%'";

        $result =& $this->get_result_from_query_on_database($sql_query);

        while($row = $result->fetch_array(MYSQLI_ASSOC))
        {
            $row["json_active_quest_ids"] = json_decode($row["json_active_quest_ids"], true);

            foreach ($row["json_active_quest_ids"] as $key => $value)
            {
                if($value==$quest_id)
                {
                    $row["json_active_quest_ids"][$key] = NULL;
                    unset($row["json_active_quest_ids"][$key]);
                }
            }

            $row["json_active_quest_ids"] = json_encode($row["json_active_quest_ids"]);

            $set_array = array("json_active_quest_ids" => $row["json_active_quest_ids"]);
            $this->set_users_data($set_array, $row["user_id"]);
        }


        $result->close();

        return true;
    }

    public function get_users_all_users_containing_username($username)
    {
        $sql_query = "SELECT username FROM ".$this->Tables_Users." WHERE username LIKE '".$username."%'";

        $result =& $this->get_result_from_query_on_database($sql_query);

        $rows = array();

        while($row = $result->fetch_array(MYSQLI_ASSOC))
        {
            $rows[] = $row["username"];
        }


        $result->close();

        return $rows;
    }

    public function get_users_all_admins()
    {
        $sql_query = "SELECT user_id,username FROM ".$this->Tables_Users." WHERE user_type_id='1'";

        $result =& $this->get_result_from_query_on_database($sql_query);

        $rows = array();

        while($row = $result->fetch_array(MYSQLI_ASSOC))
        {
            $rows[] = $row;
        }


        $result->close();

        return $rows;
    }

    public function get_users_all_superadmins()
    {
        $sql_query = "SELECT user_id,username FROM ".$this->Tables_Users." WHERE user_type_id='2'";

        $result =& $this->get_result_from_query_on_database($sql_query);

        $rows = array();

        while($row = $result->fetch_array(MYSQLI_ASSOC))
        {
            $rows[] = $row;
        }


        $result->close();

        return $rows;
    }

    public function get_users_all_not_online_last_days($days)
    {
        $sql_query = "SELECT user_id,username,email FROM ".$this->Tables_Users." WHERE DATEDIFF(CURDATE(),DATE(ts_active))>=".$days;

        $result =& $this->get_result_from_query_on_database($sql_query);

        $rows = array();

        while($row = $result->fetch_array(MYSQLI_ASSOC))
        {
            $rows[] = $row;
        }


        $result->close();

        return $rows;
    }

    public function get_users_all_last_online_within_days($days)
    {
        $sql_query = "SELECT user_id,username,email FROM ".$this->Tables_Users." WHERE DATEDIFF(CURDATE(),DATE(ts_active))<=".$days;

        $result =& $this->get_result_from_query_on_database($sql_query);

        $rows = array();

        while($row = $result->fetch_array(MYSQLI_ASSOC))
        {
            $rows[] = $row;
        }


        $result->close();

        return $rows;
    }

    public function check_users_password($user_id, $password)
    {
      $user_data = $this->get_users_all_details($user_id);

      if(md5($password . $user_data["pwd_addition"]) == $user_data["pwd_login"])
      {
        return true;
      }
      return false;
    }


    public function set_users_new_password($user_id, $password)
    {
      $user_data = $this->get_users_all_details($user_id);

      if(!$this->validation_check_pw($password))
      {
        throw new Exception("Passwort entspricht nicht dem Standard!");
      }

      $user_data["pwd_login"] = md5($password . $user_data["pwd_addition"]);

      $this->set_users_data(array("pwd_login" => $user_data["pwd_login"]), $user_id);

      return true;
    }

    public function get_users_all()
    {
        $sql_query = "SELECT user_id,username,user_type_id FROM ".$this->Tables_Users." ORDER BY username ASC";

        $result =& $this->get_result_from_query_on_database($sql_query);

        $rows = array();

        while($row = $result->fetch_array(MYSQLI_ASSOC))
        {
            $rows[] = $row;
        }


        $result->close();

        return $rows;
    }

    public function get_users_all_with_all_details()
    {
        $sql_query = "SELECT * FROM ".$this->Tables_Users;

        $result =& $this->get_result_from_query_on_database($sql_query);

        $rows = array();

        while($row = $result->fetch_array(MYSQLI_ASSOC))
        {
            $rows[] = $row;
        }


        $result->close();

        return $rows;
    }

    //End TABLES_USERS


    //
    //TABLES_FACULTIES
    //
    //public function insert_faculties_data($insert_array)
    //public function get_faculties_all_details($faculty_id)
    //public function set_faculties_data($set_array, $faculty_id)
    //public function delete_faculties($faculty_id)
    //public function get_faculties_all_all_details()
    //public function check_if_faculty_exists($faculty_id)

    public function insert_faculties_data($insert_array)
    {
        $this->get_next_free_id($insert_array["faculty_id"], $this->Tables_Faculties, "faculty_id");

        $sql_query = "INSERT INTO ".$this->Tables_Faculties." (".join(array_keys($insert_array),',').") VALUES (".$this->get_string_of_join_sql_values($insert_array).")";

        $this->get_result_from_query_on_database($sql_query);

        return $insert_array["faculty_id"];
    }

    public function get_faculties_all_details($faculty_id)
    {
        $sql_query = "SELECT * FROM ".$this->Tables_Faculties." WHERE faculty_id='".$faculty_id."'";

        $result =& $this->get_result_from_query_on_database($sql_query);

        if($result->num_rows==0) {throw new Exception("ERROR IN ".__FUNCTION__.": Faculty unknown!");}

        $row = $result->fetch_array(MYSQLI_ASSOC);

        $result->close();

        return $row;
    }

    public function set_faculties_data($set_array, $faculty_id)
    {
        $sql_query = "UPDATE ".$this->Tables_Faculties." SET ".$this->get_string_of_update_sql_values($set_array)." WHERE faculty_id=".$faculty_id;

        $result =& $this->get_result_from_query_on_database($sql_query);

        return true;
    }

    public function delete_faculties($faculty_id)
    {
        $sql_query="DELETE FROM ".$this->Tables_Faculties." WHERE faculty_id='".$faculty_id."'";

        $result =& $this->get_result_from_query_on_database($sql_query);

        return true;
    }

    public function get_faculties_all_all_details()
    {
        $sql_query = "SELECT * FROM ".$this->Tables_Faculties."  WHERE faculty_id!='-2' ORDER BY faculty_score ASC";

        $result =& $this->get_result_from_query_on_database($sql_query);

        $rows = array();

        while($row = $result->fetch_array(MYSQLI_ASSOC))
        {
            $rows[] = $row;
        }


        $result->close();

        return $rows;
    }

    public function check_if_faculty_exists($faculty_id)
    {
        $sql_query = "SELECT * FROM ".$this->Tables_Faculties." WHERE faculty_id='".$faculty_id."'";

        $result =& $this->get_result_from_query_on_database($sql_query);

        if($result->num_rows==0) return false;
        else return true;
    }

    public function set_faculty_all_score_to_null()
    {
        $all_faculties = $this->get_faculties_all_all_details();

        foreach ($all_faculties as $key => $facultyArray)
        {
            $set_array = array("faculty_score" => 0);
            $this->set_faculties_data($set_array, $facultyArray["faculty_id"]);
        }

        return true;
    }

    //End TABLES_FACULTIES

    //
    //TABLES_LOCATIONS
    //
    //public function insert_locations_data($insert_array)
    //public function get_locations_all_details($location_id)
    //public function set_locations_data($set_array, $location_id)
    //public function delete_locations($location_id)
    //public function check_if_location_exist_by_location_id($location_id)
    //public function get_locations_all_all_details()

    public function insert_locations_data($insert_array)
    {
        $this->get_next_free_id($insert_array["location_id"], $this->Tables_Locations, "location_id");

        $sql_query = "INSERT INTO ".$this->Tables_Locations." (".join(array_keys($insert_array),',').") VALUES (".$this->get_string_of_join_sql_values($insert_array).")";

        $this->get_result_from_query_on_database($sql_query);

        return $insert_array["location_id"];
    }

    public function get_locations_all_details($location_id)
    {
        $sql_query = "SELECT * FROM ".$this->Tables_Locations." WHERE location_id='".$location_id."'";

        $result =& $this->get_result_from_query_on_database($sql_query);

        if($result->num_rows==0) {throw new Exception("ERROR IN ".__FUNCTION__.": Location unknown!");}

        $row = $result->fetch_array(MYSQLI_ASSOC);


        $result->close();

        return $row;
    }

    public function set_locations_data($set_array, $location_id)
    {
        $sql_query = "UPDATE ".$this->Tables_Locations." SET ".$this->get_string_of_update_sql_values($set_array)." WHERE location_id=".$location_id;

        $result =& $this->get_result_from_query_on_database($sql_query);

        return true;
    }

    public function delete_locations($location_id)
    {
        $sql_query="DELETE FROM ".$this->Tables_Locations." WHERE location_id='".$location_id."'";

        $result =& $this->get_result_from_query_on_database($sql_query);

        return true;
    }

    public function check_if_location_exist_by_location_id($location_id)
    {
        $sql_query = "SELECT * FROM ".$this->Tables_Locations." WHERE location_id='".$location_id."'";

        $result =& $this->get_result_from_query_on_database($sql_query);

        if($result->num_rows==0) return false;
        else return true;
    }

    public function get_locations_all_all_details()
    {
        $sql_query = "SELECT * FROM ".$this->Tables_Locations;

        $result =& $this->get_result_from_query_on_database($sql_query);

        $rows = array();

        while($row = $result->fetch_array(MYSQLI_ASSOC))
        {
            $rows[] = $row;
        }


        $result->close();

        return $rows;
    }

    //End TABLES_LOCATIONS

    //
    //TABLES_TASKS
    //
    //public function insert_tasks_data($insert_array)
    //public function get_tasks_all_details($task_id)
    //public function set_tasks_data($set_array, $task_id)
    //public function delete_tasks($task_id)
    //public function get_tasks_all_from_task_type_id($task_type_id)
    //public function check_if_task_exist_by_task_id($task_id)
    //public function get_tasks_count()
    //public function get_tasks_random_mulitple_solvable_daily_task()
    //public function get_tasks_for_location($location_id)

    public function insert_tasks_data($insert_array)
    {
        $this->get_next_free_id($insert_array["task_id"], $this->Tables_Tasks, "task_id");

        $sql_query = "INSERT INTO ".$this->Tables_Tasks." (".join(array_keys($insert_array),',').") VALUES (".$this->get_string_of_join_sql_values($insert_array).")";

        $this->get_result_from_query_on_database($sql_query);

        return $insert_array["task_id"];
    }

    public function get_tasks_all_details($task_id)
    {
        $sql_query = "SELECT * FROM ".$this->Tables_Tasks." WHERE task_id='".$task_id."'";

        $result =& $this->get_result_from_query_on_database($sql_query);

        if($result->num_rows==0) {throw new Exception("ERROR IN ".__FUNCTION__.": Task unknown!");}

        $row = $result->fetch_array(MYSQLI_ASSOC);

        $result->close();

        return $row;
    }

    public function set_tasks_data($set_array, $task_id)
    {
        $sql_query = "UPDATE ".$this->Tables_Tasks." SET ".$this->get_string_of_update_sql_values($set_array)." WHERE task_id=".$task_id;

        $result =& $this->get_result_from_query_on_database($sql_query);

        return true;
    }

    public function delete_tasks($task_id)
    {
        $sql_query="DELETE FROM ".$this->Tables_Tasks." WHERE task_id='".$task_id."'";

        $result =& $this->get_result_from_query_on_database($sql_query);

        return true;
    }

    public function get_tasks_all_from_task_type_id($task_type_id)
    {
       $sql_query = "SELECT * FROM ".$this->Tables_Tasks." WHERE task_type_id='".$task_type_id."'";

        $result =& $this->get_result_from_query_on_database($sql_query);

        $rows = array();
        while($row = $result->fetch_array(MYSQLI_ASSOC))
        {
            $rows[] = $row;
        }


        $result->close();

        return $rows;
    }

    public function check_if_task_exist_by_task_id($task_id)
    {
        $sql_query = "SELECT * FROM ".$this->Tables_Tasks." WHERE task_id='".$task_id."'";

        $result =& $this->get_result_from_query_on_database($sql_query);

        if($result->num_rows==0)
        {
            return false;
        }
        return true;
    }

    public function get_tasks_count()
    {
        $sql_query = "SELECT COUNT(*) FROM ".$this->Tables_Tasks;

        $result =& $this->get_result_from_query_on_database($sql_query);

        $row = $result->fetch_array(MYSQLI_ASSOC);


        $result->close();

        return $row["COUNT(*)"];
    }

    /*public function get_tasks_random_mulitple_solvable_daily_task()
    {
        $sql_query = "SELECT * FROM ".$this->Tables_Tasks." WHERE is_multiple_solvable='1' AND location_id IS NULL ORDER BY RAND() LIMIT 1";

        $result =& $this->get_result_from_query_on_database($sql_query);

        if($result->num_rows==0)
            return array();

        $row = $result->fetch_array(MYSQLI_ASSOC);


        $result->close();

        return $row;
    }*/

    public function get_tasks_for_location($location_id)
    {
        $sql_query = "SELECT * FROM ".$this->Tables_Tasks." WHERE location_id='".$location_id."'";

        $result =& $this->get_result_from_query_on_database($sql_query);

        $rows = array();

        while($row = $result->fetch_array(MYSQLI_ASSOC))
        {
            $rows[] = $row;
        }


        $result->close();

        return $rows;
    }

    //End TABLES_TASKS

    //
    //TABLES_TASKS_TYPES
    //
    //public function insert_tasks_types_data($insert_array)
    //public function get_tasks_types_all_details($task_type_id)
    //public function set_tasks_types_data($set_array, $task_type_id)
    //public function delete_tasks_types($task_type_id)
    //public function get_tasks_types_all_all_details()

    public function insert_tasks_types_data($insert_array)
    {
        $this->get_next_free_id($insert_array["task_type_id"], $this->Tables_Tasks_Types, "task_type_id");

        $sql_query = "INSERT INTO ".$this->Tables_Tasks_Types." (".join(array_keys($insert_array),',').") VALUES (".$this->get_string_of_join_sql_values($insert_array).")";

        $this->get_result_from_query_on_database($sql_query);

        return $insert_array["task_type_id"];
    }

    public function get_tasks_types_all_details($task_type_id)
    {
        $sql_query = "SELECT * FROM ".$this->Tables_Tasks_Types." WHERE task_type_id='".$task_type_id."'";

        $result =& $this->get_result_from_query_on_database($sql_query);

        if($result->num_rows==0) {throw new Exception("ERROR IN ".__FUNCTION__.": Task-Type unknown!");}

        $row = $result->fetch_array(MYSQLI_ASSOC);


        $result->close();

        return $row;
    }

    public function set_tasks_types_data($set_array, $task_type_id)
    {
        $sql_query = "UPDATE ".$this->Tables_Tasks_Types." SET ".$this->get_string_of_update_sql_values($set_array)." WHERE task_type_id=".$task_type_id;

        $result =& $this->get_result_from_query_on_database($sql_query);

        return true;
    }

    public function delete_tasks_types($task_type_id)
    {
        $sql_query="DELETE FROM ".$this->Tables_Tasks_Types." WHERE task_type_id='".$task_type_id."'";

        $result =& $this->get_result_from_query_on_database($sql_query);

        return true;
    }

    public function get_tasks_types_all_all_details()
    {
        $sql_query = "SELECT * FROM ".$this->Tables_Tasks_Types;

        $result =& $this->get_result_from_query_on_database($sql_query);

        $rows = array();

        while($row = $result->fetch_array(MYSQLI_ASSOC))
        {
            $rows[] = $row;
        }


        $result->close();

        return $rows;
    }

    //End TABLES_TASKS

    //
    //TABLES_STATISTICS
    //
    //public function insert_statistics_data($insert_array)
    //public function get_statistics_all_details($statistic_id)
    //public function set_statistics_data($set_array, $statistic_id)
    //public function delete_statistics($statistic_id)
    //public function get_statistic_all_details_from_user_id_and_statistic_type_id($user_id, $statistic_type_id)

    public function insert_statistics_data($insert_array)
    {
        $this->get_next_free_id($insert_array["statistic_id"], $this->Tables_Statistics, "statistic_id");

        $sql_query = "INSERT INTO ".$this->Tables_Statistics." (".join(array_keys($insert_array),',').") VALUES (".$this->get_string_of_join_sql_values($insert_array).")";

        $this->get_result_from_query_on_database($sql_query);

        return $insert_array["statistic_id"];
    }

    public function get_statistics_all_details($statistic_id)
    {
        $sql_query = "SELECT * FROM ".$this->Tables_Statistics." WHERE statistic_id='".$statistic_id."'";

        $result =& $this->get_result_from_query_on_database($sql_query);

        if($result->num_rows==0) {throw new Exception("ERROR IN ".__FUNCTION__.": Statistic unknown!");}

        $row = $result->fetch_array(MYSQLI_ASSOC);

        $result->close();

        return $row;
    }

    public function set_statistics_data($set_array, $statistic_id)
    {
        $sql_query = "UPDATE ".$this->Tables_Statistics." SET ".$this->get_string_of_update_sql_values($set_array)." WHERE statistic_id=".$statistic_id;

        $result =& $this->get_result_from_query_on_database($sql_query);

        return true;
    }

    public function delete_statistics($statistic_id)
    {
        $sql_query="DELETE FROM ".$this->Tables_Statistics." WHERE statistic_id='".$statistic_id."'";

        $result =& $this->get_result_from_query_on_database($sql_query);

        return true;
    }

    public function get_statistic_all_details_from_user_id_and_statistic_type_id($user_id, $statistic_type_id)
    {
        $sql_query = "SELECT * FROM ".$this->Tables_Statistics." WHERE user_id='".$user_id."' AND statistic_type_id='".$statistic_type_id."'";

        $result =& $this->get_result_from_query_on_database($sql_query);

        if($result==false) {throw new Exception("ERROR IN ".__FUNCTION__);}

        $row = array();
        if($result->num_rows==0)
        {

            $insert_array = array(
               "statistic_type_id" => $statistic_type_id,
               "user_id" => $user_id,
               "json_statistic" => json_encode(array()),
               "ts_last_update" => "NOW()"
            );
            if(!$this->get_next_free_id($insert_array["statistic_id"], $this->Tables_Statistics, "statistic_id"))
            {
                throw new Exception("ERROR IN ".__FUNCTION__."");
            }

            $this->insert_statistics_data($insert_array);

            $sql_query = "SELECT * FROM ".$this->Tables_Statistics." WHERE user_id='".$user_id."' AND statistic_type_id='".$statistic_type_id."'";

            $result =& $this->get_result_from_query_on_database($sql_query);

            if($result==false) {throw new Exception("ERROR IN ".__FUNCTION__);}

            $row = $result->fetch_array(MYSQLI_ASSOC);

            $row["json_statistic"] = json_decode($row["json_statistic"], true);


            $result->close();
        }
        else
        {
            $row = $result->fetch_array(MYSQLI_ASSOC);

            $row["json_statistic"] = json_decode($row["json_statistic"], true);


            $result->close();
        }

        return $row;
    }

    //End TABLES_STATISTICS


    //
    //TABLES_STATISTICS
    //
    //public function insert_statistics_administration_data($insert_array)
    //public function get_statistics_administration_all_details($statistic_id)
    //public function get_statistics_administration_all_details_from_statistic_type_id($statistic_type_id)
    //public function set_statistics_administration_data($set_array, $statistic_id)
    //public function delete_statistics_administration($statistic_id)

    public function insert_statistics_administration_data($insert_array)
    {
        $this->get_next_free_id($insert_array["statistic_id"], $this->Tables_Statistics_Administration, "statistic_id");

        $sql_query = "INSERT INTO ".$this->Tables_Statistics_Administration." (".join(array_keys($insert_array),',').") VALUES (".$this->get_string_of_join_sql_values($insert_array).")";

        $this->get_result_from_query_on_database($sql_query);

        return $insert_array["statistic_id"];
    }

    public function get_statistics_administration_all_details($statistic_id)
    {
        $sql_query = "SELECT * FROM ".$this->Tables_Statistics_Administration." WHERE statistic_id='".$statistic_id."'";

        $result =& $this->get_result_from_query_on_database($sql_query);

        if($result->num_rows==0) {throw new Exception("ERROR IN ".__FUNCTION__.": Administration Statistic unknown!");}

        $row = $result->fetch_array(MYSQLI_ASSOC);


        $result->close();

        return $row;
    }

    public function get_statistics_administration_all_details_from_statistic_type_id($statistic_type_id)
    {
        $sql_query = "SELECT * FROM ".$this->Tables_Statistics_Administration." WHERE statistic_type_id='".$statistic_type_id."'";

        $result =& $this->get_result_from_query_on_database($sql_query);

        $row = array();
        if($result->num_rows==0)
        {

            $insert_array = array(
               "statistic_type_id" => $statistic_type_id,
               "json_statistic" => json_encode(array()),
               "ts_last_update" => "NOW()"
            );

            $this->insert_statistics_administration_data($insert_array);

            $sql_query = "SELECT * FROM ".$this->Tables_Statistics_Administration." WHERE statistic_type_id='".$statistic_type_id."'";

            $result =& $this->get_result_from_query_on_database($sql_query);

            if($result==false) {throw new Exception("ERROR IN ".__FUNCTION__);}

            $row = $result->fetch_array(MYSQLI_ASSOC);


            $result->close();
        }
        else
        {
            $row = $result->fetch_array(MYSQLI_ASSOC);


            $result->close();
        }

        return $row;
    }

    public function set_statistics_administration_data($set_array, $statistic_id)
    {
        $sql_query = "UPDATE ".$this->Tables_Statistics_Administration." SET ".$this->get_string_of_update_sql_values($set_array)." WHERE statistic_id=".$statistic_id;

        $result =& $this->get_result_from_query_on_database($sql_query);

        return true;
    }

    public function delete_statistics_administration($statistic_id)
    {
        $sql_query="DELETE FROM ".$this->Tables_Statistics_Administration." WHERE statistic_id='".$statistic_id."'";

        $result =& $this->get_result_from_query_on_database($sql_query);

        return true;
    }

    //End TABLES_STATISTICS



    //
    //TABLES_USER_TASK_SCORE
    //
    //public function insert_user_task_score_data($insert_array)
    //public function get_user_task_score_all_details($user_id, $task_id)
    //public function set_user_task_score_data($set_array, $user_id, $task_id)
    //public function delete_user_task_score($user_id, $task_id)
    //public function delete_user_task_all_entity_containing_user_id($user_id)
    //public function delete_user_task_all_entity_containing_task_id($task_id)
    //public function get_user_task_score_all_task_score_from_user_id($user_id)
    //public function get_user_task_score_all_user_ids_from_task_id($task_id)
    //public function get_user_task_score_last_updated_tasks($user_id, $count)

    public function insert_user_task_score_data($insert_array)
    {
        if(!isset($insert_array["task_id"]) || !isset($insert_array["user_id"]))
        {
            throw new Exception("ERROR IN ".__FUNCTION__."");
        }

        if($this->check_if_entity_exists($this->Tables_User_Task_Score, array(0 => '*'), array("user_id" => $insert_array["user_id"], "task_id" => $insert_array["task_id"])))
        {
            throw new Exception("ERROR IN ".__FUNCTION__."");
        }

        $sql_query = "INSERT INTO ".$this->Tables_User_Task_Score." (".join(array_keys($insert_array),',').") VALUES (".$this->get_string_of_join_sql_values($insert_array).")";

        $this->get_result_from_query_on_database($sql_query);

        return true;
    }

    public function get_user_task_score_all_details($user_id, $task_id)
    {
        $sql_query = "SELECT * FROM ".$this->Tables_User_Task_Score." WHERE user_id='".$user_id."' AND task_id='".$task_id."'";

        $result =& $this->get_result_from_query_on_database($sql_query);

        $row;
        if($result->num_rows==0)
        {

            $result->close();

            $sql_query = "SELECT * FROM ".$this->Tables_Tasks." WHERE task_id='".$task_id."'";
            $result =& $this->get_result_from_query_on_database($sql_query);
            if($result->num_rows==0) throw new Exception("ERROR IN ".__FUNCTION__);

            $result->close();

            $sql_query = "SELECT * FROM ".$this->Tables_Users." WHERE user_id='".$user_id."'";
            $result =& $this->get_result_from_query_on_database($sql_query);
            if($result->num_rows==0) throw new Exception("ERROR IN ".__FUNCTION__);

            $result->close();

            $insert_array = array(
               "user_id" => $user_id,
               "task_id" => $task_id,
               "value" => 0,
               "ts_first_update" => "NOW()",
               "ts_last_update" => "NOW()",
               "json_ts_value_update" => json_encode(array())
            );

            $row = $insert_array;

            $this->insert_user_task_score_data($insert_array);
        }
        else
        {
            $row = $result->fetch_array(MYSQLI_ASSOC);


            $result->close();
        }

        return $row;
    }

    public function set_user_task_score_data($set_array, $user_id, $task_id)
    {
        $sql_query = "UPDATE ".$this->Tables_User_Task_Score." SET ".$this->get_string_of_update_sql_values($set_array)." WHERE user_id=".$user_id." AND task_id=".$task_id;

        $result =& $this->get_result_from_query_on_database($sql_query);

        return true;
    }

    public function delete_user_task_score($user_id, $task_id)
    {
        $sql_query="DELETE FROM ".$this->Tables_User_Task_Score." WHERE user_id='".$user_id."' AND task_id='".$task_id."'";

        $result =& $this->get_result_from_query_on_database($sql_query);

        return true;
    }

    public function delete_user_task_all_entity_containing_user_id($user_id)
    {
        $sql_query="DELETE FROM ".$this->Tables_User_Task_Score." WHERE user_id='".$user_id."'";

        $result =& $this->get_result_from_query_on_database($sql_query);

        return true;
    }

    public function delete_user_task_all_entity_containing_task_id($task_id)
    {
        $sql_query="DELETE FROM ".$this->Tables_User_Task_Score." WHERE task_id='".$task_id."'";

        $result =& $this->get_result_from_query_on_database($sql_query);

        return true;
    }

    public function get_user_task_score_all_task_score_from_user_id($user_id)
    {
        $sql_query = "SELECT * FROM ".$this->Tables_User_Task_Score." WHERE user_id='".$user_id."'";

        $result =& $this->get_result_from_query_on_database($sql_query);

        $rows = array();
        $row = array();
        while($row = $result->fetch_array(MYSQLI_ASSOC))
        {
            $rows[] = $row;
        }


        $result->close();

        return $rows;
    }

    public function get_user_task_score_all_user_ids_from_task_id($task_id)
    {
        $sql_query = "SELECT * FROM ".$this->Tables_User_Task_Score." WHERE task_id='".$task_id."'";

        $result =& $this->get_result_from_query_on_database($sql_query);

        $rows = array();
        $row = array();
        while($row = $result->fetch_array(MYSQLI_ASSOC))
        {
            $rows[] = $row;
        }


        $result->close();

        return $rows;
    }

    public function get_user_task_score_last_updated_tasks($user_id, $count)
    {
        $sql_query = "SELECT * FROM ".$this->Tables_User_Task_Score." WHERE user_id='".$user_id."' ORDER BY ts_last_update DESC LIMIT ".$count;

        $result =& $this->get_result_from_query_on_database($sql_query);

        $rows = array();
        $row = array();
        while($row = $result->fetch_array(MYSQLI_ASSOC))
        {
            $rows[] = $row;
        }


        $result->close();

        return $rows;
    }

    //End TABLES_USER_TASK_SCORE

    //
    //TABLES_MAPPING_USER_TYPES
    //
    //public function get_mapping_user_types_user_typename_from_user_type_id($user_type_id, $language)

    public function get_mapping_user_types_user_typename_from_user_type_id($user_type_id, $language)
    {
        $sql_query = "SELECT * FROM ".$this->Tables_Mapping_User_Types." WHERE user_type_id='".$user_type_id."' AND language='".$language."'";

        $result =& $this->get_result_from_query_on_database($sql_query);

        if($result->num_rows==0) {throw new Exception("ERROR IN ".__FUNCTION__);}

        $row = $result->fetch_array(MYSQLI_ASSOC);


        $result->close();

        return $row["user_typename"];
    }

    //End TABLES_MAPPING_USER_TYPES

    //
    //TABLES_FAQ
    //

    //public function get_faq($language)
    //public function insert_faq_data($insert_array)

    public function get_faq($language)
    {
        $sql_query = "SELECT * FROM ".$this->Tables_Faq." WHERE language='".$language."'";

        $result =& $this->get_result_from_query_on_database($sql_query);

        $rows = array();
        $row = array();
        while($row = $result->fetch_array(MYSQLI_ASSOC))
        {
            $rows[] = $row;
        }


        $result->close();

        return $rows;
    }

    public function insert_faq_data($insert_array)
    {
        $this->get_next_free_id($insert_array["faq_id"], $this->Tables_Faq, "faq_id");

        $sql_query = "INSERT INTO ".$this->Tables_Faq." (".join(array_keys($insert_array),',').") VALUES (".$this->get_string_of_join_sql_values($insert_array).")";

        $this->get_result_from_query_on_database($sql_query);

        return $insert_array["faq_id"];
    }
    //End TABLES_FAQ

    //
    //TABLES_BADGES
    //
    //public function insert_badges_data($insert_array)
    //public function get_badges_all_details($badge_id)
    //public function set_badges_data($set_array, $badge_id)
    //public function delete_badges($badge_id)
    //public function get_badges_all_all_details()
    //public function get_badges_count()
    //public function delete_badges_task_id_from_json_task_ids($task_id)
    //public function check_if_badge_exist_by_badge_id($badge_id)

    public function insert_badges_data($insert_array)
    {
        $this->get_next_free_id($insert_array["badge_id"], $this->Tables_Badges, "badge_id");

        $sql_query = "INSERT INTO ".$this->Tables_Badges." (".join(array_keys($insert_array),',').") VALUES (".$this->get_string_of_join_sql_values($insert_array).")";

        $this->get_result_from_query_on_database($sql_query);

        return $insert_array["badge_id"];
    }

    public function get_badges_all_details($badge_id)
    {
        $sql_query = "SELECT * FROM ".$this->Tables_Badges." WHERE badge_id='".$badge_id."'";

        $result =& $this->get_result_from_query_on_database($sql_query);

        if($result->num_rows==0) {throw new Exception("ERROR IN ".__FUNCTION__.": Badge unknown!");}

        $row = $result->fetch_array(MYSQLI_ASSOC);


        $result->close();

        return $row;
    }

    public function set_badges_data($set_array, $badge_id)
    {
        $sql_query = "UPDATE ".$this->Tables_Badges." SET ".$this->get_string_of_update_sql_values($set_array)." WHERE badge_id=".$badge_id;

        $result =& $this->get_result_from_query_on_database($sql_query);

        return true;
    }

    public function delete_badges($badge_id)
    {
        $sql_query="DELETE FROM ".$this->Tables_Badges." WHERE badge_id='".$badge_id."'";

        $result =& $this->get_result_from_query_on_database($sql_query);

        return true;
    }

    public function get_badges_all_all_details()
    {
        $sql_query = "SELECT * FROM ".$this->Tables_Badges;

        $result =& $this->get_result_from_query_on_database($sql_query);

        $rows = array();

        while($row = $result->fetch_array(MYSQLI_ASSOC))
        {
            $rows[] = $row;
        }


        $result->close();

        return $rows;
    }

    public function get_badges_count()
    {
        $sql_query = "SELECT COUNT(*) FROM ".$this->Tables_Badges;

        $result =& $this->get_result_from_query_on_database($sql_query);

        $row = $result->fetch_array(MYSQLI_ASSOC);


        $result->close();

        return $row["COUNT(*)"];
    }

    public function delete_badges_task_id_from_json_task_ids($task_id)
    {
        $sql_query = "SELECT badge_id,json_task_ids FROM ".$this->Tables_Badges." WHERE json_task_ids LIKE '%".$task_id."%'";

        $result =& $this->get_result_from_query_on_database($sql_query);

        while($row = $result->fetch_array(MYSQLI_ASSOC))
        {
            $row["json_task_ids"] = json_decode($row["json_task_ids"], true);

            foreach ($row["json_task_ids"] as $key => $value)
            {
                if($value==$task_id)
                {
                    $row["json_task_ids"][$key] = NULL;
                    unset($row["json_task_ids"][$key]);
                }
            }

            $row["json_task_ids"] = json_encode($row["json_task_ids"]);

            $set_array = array("json_task_ids" => $row["json_task_ids"]);
            $this->set_badges_data($set_array, $row["badge_id"]);
        }


        $result->close();

        return true;
    }

    public function check_if_badge_exist_by_badge_id($badge_id)
    {
        $sql_query = "SELECT * FROM ".$this->Tables_Badges." WHERE badge_id='".$badge_id."'";

        $result =& $this->get_result_from_query_on_database($sql_query);

        if($result->num_rows==0)
        {
            return false;
        }
        return true;
    }


    //End TABLES_BADGES

    //
    //TABLES_USER_BADGE
    //
    //public function insert_user_badge_data($insert_array)
    //public function get_user_badge_all_details($user_id, $badge_id)
    //public function set_user_badge_data($set_array, $user_id, $badge_id)
    //public function delete_user_badge($user_id, $badge_id)
    //public function delete_user_badge_all_entity_containing_user_id($user_id)
    //public function delete_user_badge_all_entity_containing_badge_id($badge_id)
    //public function get_user_badge_all_completed_badge_from_user_id($user_id)
    //public function get_user_badge_all_user_ids_from_badge_completed($badge_id)
    //public function get_user_badge_last_updated_badges($user_id, $count)

    public function insert_user_badge_data($insert_array)
    {
        if(!isset($insert_array["badge_id"]) || !isset($insert_array["user_id"]))
        {
            throw new Exception("ERROR IN ".__FUNCTION__."");
        }

        if($this->check_if_entity_exists($this->Tables_User_Badge, array(0 => '*'), array("user_id" => $insert_array["user_id"], "badge_id" => $insert_array["badge_id"])))
        {
            throw new Exception("ERROR IN ".__FUNCTION__."");
        }

        $sql_query = "INSERT INTO ".$this->Tables_User_Badge." (".join(array_keys($insert_array),',').") VALUES (".$this->get_string_of_join_sql_values($insert_array).")";

        $this->get_result_from_query_on_database($sql_query);

        return true;
    }

    public function get_user_badge_all_details($user_id, $badge_id)
    {
        $sql_query = "SELECT * FROM ".$this->Tables_User_Badge." WHERE user_id='".$user_id."' AND badge_id='".$badge_id."'";

        $result =& $this->get_result_from_query_on_database($sql_query);

        $row;
        if($result->num_rows==0)
        {

            $result->close();

            $sql_query = "SELECT * FROM ".$this->Tables_Badges." WHERE badge_id='".$badge_id."'";
            $result =& $this->get_result_from_query_on_database($sql_query);
            if($result->num_rows==0) throw new Exception("ERROR IN ".__FUNCTION__);

            $result->close();

            $sql_query = "SELECT * FROM ".$this->Tables_Users." WHERE user_id='".$user_id."'";
            $result =& $this->get_result_from_query_on_database($sql_query);
            if($result->num_rows==0) throw new Exception("ERROR IN ".__FUNCTION__);

            $result->close();

            $insert_array = array(
               "user_id" => $user_id,
               "badge_id" => $badge_id,
               "completed" => 0,
               "ts_badge_completed" => NULL
            );

            $row = $insert_array;

            $this->insert_user_badge_data($insert_array);
        }
        else
        {
            $row = $result->fetch_array(MYSQLI_ASSOC);


            $result->close();
        }

        return $row;
    }

    public function set_user_badge_data($set_array, $user_id, $badge_id)
    {
        $sql_query = "SELECT * FROM ".$this->Tables_User_Badge." WHERE user_id='".$user_id."' AND badge_id='".$badge_id."'";

        $result =& $this->get_result_from_query_on_database($sql_query);

        if($result->num_rows==0)
        {
            $insert_array = array(
               "user_id" => $user_id,
               "badge_id" => $badge_id,
               "completed" => 0,
               "ts_badge_completed" => NULL
            );

            $this->insert_user_badge_data($insert_array);
        }

        if(isset($set_array["user_id"])) unset($set_array["user_id"]);
        if(isset($set_array["badge_id"])) unset($set_array["badge_id"]);

        $sql_query = "UPDATE ".$this->Tables_User_Badge." SET ".$this->get_string_of_update_sql_values($set_array)." WHERE user_id=".$user_id." AND badge_id=".$badge_id;

        $result =& $this->get_result_from_query_on_database($sql_query);

        return true;
    }

    public function delete_user_badge($user_id, $badge_id)
    {
        $sql_query="DELETE FROM ".$this->Tables_User_Badge." WHERE user_id='".$user_id."' AND badge_id='".$badge_id."'";

        $result =& $this->get_result_from_query_on_database($sql_query);

        return true;
    }

    public function delete_user_badge_all_entity_containing_user_id($user_id)
    {
        $sql_query="DELETE FROM ".$this->Tables_User_Badge." WHERE user_id='".$user_id."'";

        $result =& $this->get_result_from_query_on_database($sql_query);

        return true;
    }

    public function delete_user_badge_all_entity_containing_badge_id($badge_id)
    {
        $sql_query="DELETE FROM ".$this->Tables_User_Badge." WHERE badge_id='".$badge_id."'";

        $result =& $this->get_result_from_query_on_database($sql_query);

        return true;
    }

    public function get_user_badge_all_completed_badge_from_user_id($user_id)
    {
        $sql_query = "SELECT * FROM ".$this->Tables_User_Badge." WHERE user_id='".$user_id."' AND completed=1";

        $result =& $this->get_result_from_query_on_database($sql_query);

        $rows = array();
        $row = array();
        while($row = $result->fetch_array(MYSQLI_ASSOC))
        {
            $rows[] = $row;
        }


        $result->close();

        return $rows;
    }

    public function get_user_badge_all_user_ids_from_badge_completed($badge_id)
    {
        $sql_query = "SELECT * FROM ".$this->Tables_User_Badge." WHERE badge_id='".$badge_id."'";

        $result =& $this->get_result_from_query_on_database($sql_query);

        $rows = array();
        $row = array();
        while($row = $result->fetch_array(MYSQLI_ASSOC))
        {
            $rows[] = $row;
        }


        $result->close();

        return $rows;
    }

    public function get_user_badge_last_completed_badges($user_id, $count)
    {
        $sql_query = "SELECT * FROM ".$this->Tables_User_Badge." WHERE user_id='".$user_id."' AND completed='1' ORDER BY ts_badge_completed DESC LIMIT ".$count;

        $result =& $this->get_result_from_query_on_database($sql_query);

        $rows = array();
        $row = array();
        while($row = $result->fetch_array(MYSQLI_ASSOC))
        {
            $rows[] = $row;
        }


        $result->close();

        return $rows;
    }

    public function check_if_user_has_completed_badge($user_id, $badge_id)
    {
        $user_badge_data = $this->get_user_badge_all_details($user_id, $badge_id);

        if($user_badge_data["completed"]==1) return true;
        else return false;
    }

    //End TABLES_USER_BADGE


    //
    //TABLES_BADGES_DESCRIPTIONS
    //
    //public function insert_badges_descriptions_data($insert_array)
    //public function get_badges_descriptions_all_details($badge_id, $language)
    //public function set_badges_descriptions_data($set_array, $badge_id, $language)
    //public function delete_badges_descriptions($badge_id, $language)
    //public function delete_badges_descriptions_all_entity_containing_badge_id($badge_id)
    //public function get_badges_descriptions_description_only_with_fallback_language($badge_id, $language)
    //public function get_badges_descriptions_all_details_keyed_after_language($badge_id)
    //public function get_badges_descriptions_badge_id_from_badgename($badgename)
    //public function get_badges_descriptions_all_badgenames_containing_badgename($badgename, $language)

    public function insert_badges_descriptions_data($insert_array)
    {
        $sql_query = "INSERT INTO ".$this->Tables_Badges_Descriptions." (".join(array_keys($insert_array),',').") VALUES (".$this->get_string_of_join_sql_values($insert_array).")";

        $this->get_result_from_query_on_database($sql_query);

        return true;
    }

    public function get_badges_descriptions_all_details($badge_id, $language)
    {
        $sql_query = "SELECT * FROM ".$this->Tables_Badges_Descriptions." WHERE badge_id='".$badge_id."' AND language='".$language."'";

        $result =& $this->get_result_from_query_on_database($sql_query);

        $row = $result->fetch_array(MYSQLI_ASSOC);


        $result->close();

        return $row;
    }

    public function set_badges_descriptions_data($set_array, $badge_id, $language)
    {
        $sql_query = "UPDATE ".$this->Tables_Badges_Descriptions." SET ".$this->get_string_of_update_sql_values($set_array)." WHERE badge_id=".$badge_id." AND language='$language'";

        $result =& $this->get_result_from_query_on_database($sql_query);

        return true;
    }

    public function delete_badges_descriptions($badge_id, $language)
    {
        $sql_query="DELETE FROM ".$this->Tables_Badges_Descriptions." WHERE badge_id='".$badge_id."' AND language='".$language."'";

        $result =& $this->get_result_from_query_on_database($sql_query);

        return true;
    }

    public function delete_badges_descriptions_all_entity_containing_badge_id($badge_id)
    {
        $sql_query="DELETE FROM ".$this->Tables_Badges_Descriptions." WHERE badge_id='".$badge_id."'";

        $result =& $this->get_result_from_query_on_database($sql_query);

        return true;
    }

    public function get_badges_descriptions_description_only_with_fallback_language($badge_id, $language)
    {
        $sql_query = "SELECT badgename,description_long,solved_description FROM ".$this->Tables_Badges_Descriptions." WHERE badge_id='".$badge_id."' AND language='".$language."'";

        $result =& $this->get_result_from_query_on_database($sql_query);

        if($result->num_rows==0)
        {

            $result->close();

            $sql_query = "SELECT badgename,description_long,solved_description FROM ".$this->Tables_Badges_Descriptions." WHERE badge_id='".$badge_id."' AND language='".JKF_Const::getFromINI('STANDARD_LANGUAGE')."'";

            $result =& $this->get_result_from_query_on_database($sql_query);

            if($result->num_rows==0)
            {
                $row = array("badgename" => "", "description_long" => "", "solved_description" => "");


                $result->close();

                return $row;
            }
            else
            {
                $row = $result->fetch_array(MYSQLI_ASSOC);


                $result->close();

                return $row;
            }
        }
        else
        {
            $row = $result->fetch_array(MYSQLI_ASSOC);


            $result->close();

            return $row;
        }
    }

    public function get_badges_descriptions_all_details_keyed_after_language($badge_id)
    {
        $sql_query = "SELECT * FROM ".$this->Tables_Badges_Descriptions." WHERE badge_id='".$badge_id."'";

        $result =& $this->get_result_from_query_on_database($sql_query);

        $rows = array();

        while($row = $result->fetch_array(MYSQLI_ASSOC))
        {
            $rows[$row["language"]] = array("badgename" => $row["badgename"], "description_long" => $row["description_long"]);
        }


        $result->close();

        return $rows;
    }

    public function get_badges_descriptions_badge_id_from_badgename($badgename)
    {
        $sql_query = "SELECT * FROM ".$this->Tables_Badges_Descriptions." WHERE badgename='".$badgename."'";

        $result =& $this->get_result_from_query_on_database($sql_query);

        if($result->num_rows==0) {throw new Exception("ERROR IN ".__FUNCTION__.": Badge unknown!");}

        $row = $result->fetch_array(MYSQLI_ASSOC);


        $result->close();

        return $row["badge_id"];
    }

    public function get_badges_descriptions_all_badgenames_containing_badgename($badgename, $language)
    {
        $sql_query = "SELECT badgename FROM ".$this->Tables_Badges_Descriptions." WHERE badgename LIKE '".$badgename."%'";

        $result =& $this->get_result_from_query_on_database($sql_query);

        $rows = array();

        while($row = $result->fetch_array(MYSQLI_ASSOC))
        {
            $rows[] = $row["badgename"];
        }


        $result->close();

        return $rows;
    }
    //End TABLES_BADGES_DESCRIPTIONS



    //
    //TABLES_FACULTIES_DESCRIPTIONS
    //
    //public function insert_faculties_descriptions_data($insert_array)
    //public function get_faculties_descriptions_all_details($faculty_id, $language)
    //public function set_faculties_descriptions_data($set_array, $faculty_id, $language)
    //public function delete_faculties_descriptions($faculty_id, $language)
    //public function get_faculties_descriptions_description_only_with_fallback_language($faculty_id, $language)
    //public function get_faculties_descriptions_all_details_keyed_after_language($faculty_id)

    public function insert_faculties_descriptions_data($insert_array)
    {
        $sql_query = "INSERT INTO ".$this->Tables_Faculties_Descriptions." (".join(array_keys($insert_array),',').") VALUES (".$this->get_string_of_join_sql_values($insert_array).")";

        $this->get_result_from_query_on_database($sql_query);

        return true;
    }

    public function get_faculties_descriptions_all_details($faculty_id, $language)
    {
        $sql_query = "SELECT * FROM ".$this->Tables_Faculties_Descriptions." WHERE faculty_id='".$faculty_id."' AND language='".$language."'";

        $result =& $this->get_result_from_query_on_database($sql_query);

        $row = $result->fetch_array(MYSQLI_ASSOC);


        $result->close();

        return $row;
    }

    public function set_faculties_descriptions_data($set_array, $faculty_id, $language)
    {
        $sql_query = "UPDATE ".$this->Tables_Faculties_Descriptions." SET ".$this->get_string_of_update_sql_values($set_array)." WHERE faculty_id=".$faculty_id." AND language='".$language."'";

        $result =& $this->get_result_from_query_on_database($sql_query);


        return true;
    }

    public function delete_faculties_descriptions($faculty_id, $language)
    {
        $sql_query="DELETE FROM ".$this->Tables_Faculties_Descriptions." WHERE faculty_id='".$faculty_id."' AND language='".$language."'";

        $result =& $this->get_result_from_query_on_database($sql_query);

        return true;
    }

    public function get_faculties_descriptions_description_only_with_fallback_language($faculty_id, $language)
    {
        $sql_query = "SELECT description_long FROM ".$this->Tables_Faculties_Descriptions." WHERE faculty_id='".$faculty_id."' AND language='".$language."'";

        $result =& $this->get_result_from_query_on_database($sql_query);

        if($result->num_rows==0)
        {

            $result->close();

            $sql_query = "SELECT description_long FROM ".$this->Tables_Faculties_Descriptions." WHERE faculty_id='".$faculty_id."' AND language='".JKF_Const::getFromINI('STANDARD_LANGUAGE')."'";

            $result =& $this->get_result_from_query_on_database($sql_query);

            if($result->num_rows==0)
            {
                $row = array("description_long" => "");


                $result->close();

                return $row;
            }
            else
            {
                $row = $result->fetch_array(MYSQLI_ASSOC);


                $result->close();

                return $row;
            }
        }
        else
        {
            $row = $result->fetch_array(MYSQLI_ASSOC);


            $result->close();

            return $row;
        }
    }

    public function get_faculties_descriptions_all_details_keyed_after_language($faculty_id)
    {
        $sql_query = "SELECT * FROM ".$this->Tables_Faculties_Descriptions." WHERE faculty_id='".$faculty_id."'";

        $result =& $this->get_result_from_query_on_database($sql_query);

        $rows = array();

        while($row = $result->fetch_array(MYSQLI_ASSOC))
        {
            $rows[$row["language"]] = array("description_long" => $row["description_long"]);
        }


        $result->close();

        return $rows;
    }
    //End TABLES_FACULTIES_DESCRIPTIONS


    //
    //TABLES_LOCATIONS_DESCRIPTIONS
    //
    //public function insert_locations_descriptions_data($insert_array)
    //public function get_locations_descriptions_all_details($location_id, $language)
    //public function set_locations_descriptions_data($set_array, $location_id, $language)
    //public function delete_locations_descriptions($location_id, $language)
    //public function get_locations_descriptions_description_only_with_fallback_language($location_id, $language)
    //public function get_locations_descriptions_all_details_keyed_after_language($location_id)
    //public function check_if_lati_long_is_within_location_id($lati, $long, $location_id)

    public function insert_locations_descriptions_data($insert_array)
    {
        $sql_query = "INSERT INTO ".$this->Tables_Locations_Descriptions." (".join(array_keys($insert_array),',').") VALUES (".$this->get_string_of_join_sql_values($insert_array).")";

        $this->get_result_from_query_on_database($sql_query);

        return true;
    }

    public function get_locations_descriptions_all_details($location_id, $language)
    {
        $sql_query = "SELECT * FROM ".$this->Tables_Locations_Descriptions." WHERE location_id='".$location_id."' AND language='".$language."'";

        $result =& $this->get_result_from_query_on_database($sql_query);

        $row = $result->fetch_array(MYSQLI_ASSOC);


        $result->close();

        return $row;
    }

    public function set_locations_descriptions_data($set_array, $location_id, $language)
    {
        $sql_query = "UPDATE ".$this->Tables_Locations_Descriptions." SET ".$this->get_string_of_update_sql_values($set_array)." WHERE location_id=".$location_id." AND language='".$language."'";

        $result =& $this->get_result_from_query_on_database($sql_query);

        return true;
    }

    public function delete_locations_descriptions($location_id, $language)
    {
        $sql_query="DELETE FROM ".$this->Tables_Locations_Descriptions." WHERE location_id='".$location_id."' AND language='".$language."'";

        $result =& $this->get_result_from_query_on_database($sql_query);

        return true;
    }

    public function get_locations_descriptions_description_only_with_fallback_language($location_id, $language)
    {
        $sql_query = "SELECT locationname,description_long FROM ".$this->Tables_Locations_Descriptions." WHERE location_id='".$location_id."' AND language='".$language."'";

        $result =& $this->get_result_from_query_on_database($sql_query);

        if($result->num_rows==0)
        {

            $result->close();

            $sql_query = "SELECT locationname,description_long FROM ".$this->Tables_Locations_Descriptions." WHERE location_id='".$location_id."' AND language='".JKF_Const::getFromINI('STANDARD_LANGUAGE')."'";

            $result =& $this->get_result_from_query_on_database($sql_query);

            if($result->num_rows==0)
            {
                $row = array("locationname" => "", "description_long" => "");


                $result->close();

                return $row;
            }
            else
            {
                $row = $result->fetch_array(MYSQLI_ASSOC);


                $result->close();

                return $row;
            }
        }
        else
        {
            $row = $result->fetch_array(MYSQLI_ASSOC);


            $result->close();

            return $row;
        }
    }

    public function get_locations_descriptions_all_details_keyed_after_language($location_id)
    {
        $sql_query = "SELECT * FROM ".$this->Tables_Locations_Descriptions." WHERE location_id='".$location_id."'";

        $result =& $this->get_result_from_query_on_database($sql_query);

        $rows = array();

        while($row = $result->fetch_array(MYSQLI_ASSOC))
        {
            $rows[$row["language"]] = array("description_long" => $row["description_long"]);
        }


        $result->close();

        return $rows;
    }

    public function check_if_lati_long_is_within_location_id($lati, $long, $location_id)
    {
        $location_data = $this->get_locations_all_details($location_id);

        if($this->is_lati_long_within_location($lati, $long, $location_data["geo_lati"], $location_data["geo_long"], $location_data["geo_radius"]))
            return true;
        else
            return false;
    }
    //End TABLES_LOCATIONS_DESCRIPTIONS

    //
    //TABLES_TASKS_DESCRIPTIONS
    //
    //public function insert_tasks_descriptions_data($insert_array)
    //public function get_tasks_descriptions_all_details($task_id, $language)
    //public function set_tasks_descriptions_data($set_array, $task_id, $language)
    //public function delete_tasks_descriptions($task_id, $language)
    //public function delete_tasks_descriptions_all_entity_containing_task_id($task_id)
    //public function get_tasks_descriptions_description_only_with_fallback_language($task_id, $language)
    //public function get_tasks_descriptions_all_details_keyed_after_language($task_id)
    //public function get_tasks_descriptions_task_id_from_taskname($taskname)
    //public function get_tasks_descriptions_all_tasknames_containing_taskname($taskname, $language)

    public function insert_tasks_descriptions_data($insert_array)
    {
        $sql_query = "INSERT INTO ".$this->Tables_Tasks_Descriptions." (".join(array_keys($insert_array),',').") VALUES (".$this->get_string_of_join_sql_values($insert_array).")";

        $this->get_result_from_query_on_database($sql_query);

        return true;
    }

    public function get_tasks_descriptions_all_details($task_id, $language)
    {
        $sql_query = "SELECT * FROM ".$this->Tables_Tasks_Descriptions." WHERE task_id='".$task_id."' AND language='".$language."'";

        $result =& $this->get_result_from_query_on_database($sql_query);

        $row = $result->fetch_array(MYSQLI_ASSOC);


        $result->close();

        return $row;
    }

    public function set_tasks_descriptions_data($set_array, $task_id, $language)
    {
        $sql_query = "UPDATE ".$this->Tables_Tasks_Descriptions." SET ".$this->get_string_of_update_sql_values($set_array)." WHERE task_id=".$task_id." AND language='$language'";

        $result =& $this->get_result_from_query_on_database($sql_query);

        return true;
    }

    public function delete_tasks_descriptions($task_id, $language)
    {
        $sql_query="DELETE FROM ".$this->Tables_Tasks_Descriptions." WHERE task_id='".$task_id."' AND language='".$language."'";

        $result =& $this->get_result_from_query_on_database($sql_query);

        return true;
    }

    public function delete_tasks_descriptions_all_entity_containing_task_id($task_id)
    {
        $sql_query="DELETE FROM ".$this->Tables_Tasks_Descriptions." WHERE task_id='".$task_id."'";

        $result =& $this->get_result_from_query_on_database($sql_query);

        return true;
    }

    public function get_tasks_descriptions_description_only_with_fallback_language($task_id, $language)
    {
        $sql_query = "SELECT taskname,description_long,solved_description FROM ".$this->Tables_Tasks_Descriptions." WHERE task_id='".$task_id."' AND language='".$language."'";

        $result =& $this->get_result_from_query_on_database($sql_query);

        if($result->num_rows==0)
        {

            $result->close();

            $sql_query = "SELECT taskname,description_long,solved_description FROM ".$this->Tables_Tasks_Descriptions." WHERE task_id='".$task_id."' AND language='".JKF_Const::getFromINI('STANDARD_LANGUAGE')."'";

            $result =& $this->get_result_from_query_on_database($sql_query);

            if($result->num_rows==0)
            {
                $row = array("taskname" => "", "description_long" => "", "solved_description" => "");


                $result->close();

                return $row;
            }
            else
            {
                $row = $result->fetch_array(MYSQLI_ASSOC);


                $result->close();

                return $row;
            }
        }
        else
        {
            $row = $result->fetch_array(MYSQLI_ASSOC);


            $result->close();

            return $row;
        }
    }

    public function get_tasks_descriptions_all_details_keyed_after_language($task_id)
    {
        $sql_query = "SELECT * FROM ".$this->Tables_Tasks_Descriptions." WHERE task_id='".$task_id."'";

        $result =& $this->get_result_from_query_on_database($sql_query);

        $rows = array();

        while($row = $result->fetch_array(MYSQLI_ASSOC))
        {
            $rows[$row["language"]] = array("taskname" => $row["taskname"], "description_long" => $row["description_long"]);
        }


        $result->close();

        return $rows;
    }

    public function get_tasks_descriptions_task_id_from_taskname($taskname)
    {
        $sql_query = "SELECT * FROM ".$this->Tables_Tasks_Descriptions." WHERE taskname='".$taskname."'";

        $result =& $this->get_result_from_query_on_database($sql_query);

        if($result->num_rows==0) {throw new Exception("ERROR IN ".__FUNCTION__.": Task unknown!");}

        $row = $result->fetch_array(MYSQLI_ASSOC);


        $result->close();

        return $row["task_id"];
    }

    public function get_tasks_descriptions_all_tasknames_containing_taskname($taskname, $language)
    {
        $sql_query = "SELECT taskname FROM ".$this->Tables_Tasks_Descriptions." WHERE language='".$language."' AND taskname LIKE '".$taskname."%'";

        $result =& $this->get_result_from_query_on_database($sql_query);

        $rows = array();

        while($row = $result->fetch_array(MYSQLI_ASSOC))
        {
            $rows[] = $row["taskname"];
        }


        $result->close();

        return $rows;
    }

    //End TABLES_TASKS_DESCRIPTIONS

    //
    //TABLES_TASKS_TYPES_DESCRIPTIONS
    //
    //public function insert_tasks_types_descriptions_data($insert_array)
    //public function get_tasks_types_descriptions_all_details($task_type_id, $language)
    //public function set_tasks_types_descriptions_data($set_array, $task_type_id, $language)
    //public function delete_tasks_types_descriptions($task_type_id, $language)
    //public function get_tasks_types_descriptions_description_only_with_fallback_language($task_type_id, $language)
    //public function get_tasks_types_descriptions_all_details_keyed_after_language($task_type_id)

    public function insert_tasks_types_descriptions_data($insert_array)
    {
        $sql_query = "INSERT INTO ".$this->Tables_Tasks_Types_Descriptions." (".join(array_keys($insert_array),',').") VALUES (".$this->get_string_of_join_sql_values($insert_array).")";

        $this->get_result_from_query_on_database($sql_query);

        return true;
    }

    public function get_tasks_types_descriptions_all_details($task_type_id, $language)
    {
        $sql_query = "SELECT * FROM ".$this->Tables_Tasks_Types_Descriptions." WHERE task_type_id='".$task_type_id."' AND language='".$language."'";

        $result =& $this->get_result_from_query_on_database($sql_query);

        $row = $result->fetch_array(MYSQLI_ASSOC);


        $result->close();

        return $row;
    }

    public function set_tasks_types_descriptions_data($set_array, $task_type_id, $language)
    {
        $sql_query = "UPDATE ".$this->Tables_Tasks_Types_Descriptions." SET ".$this->get_string_of_update_sql_values($set_array)." WHERE task_type_id=".$task_type_id." AND language='$language'";

        $result =& $this->get_result_from_query_on_database($sql_query);

        return true;
    }

    public function delete_tasks_types_descriptions($task_type_id, $language)
    {
        $sql_query="DELETE FROM ".$this->Tables_Tasks_Types_Descriptions." WHERE task_type_id='".$task_type_id."' AND language='".$language."'";

        $result =& $this->get_result_from_query_on_database($sql_query);

        return true;
    }

    public function get_tasks_types_descriptions_description_only_with_fallback_language($task_type_id, $language)
    {
        $sql_query = "SELECT task_type_name,description_long FROM ".$this->Tables_Tasks_Types_Descriptions." WHERE task_type_id='".$task_type_id."' AND language='".$language."'";

        $result =& $this->get_result_from_query_on_database($sql_query);

        if($result->num_rows==0)
        {

            $result->close();

            $sql_query = "SELECT task_type_name,description_long FROM ".$this->Tables_Tasks_Types_Descriptions." WHERE task_type_id='".$task_type_id."' AND language='".JKF_Const::getFromINI('STANDARD_LANGUAGE')."'";

            $result =& $this->get_result_from_query_on_database($sql_query);

            if($result->num_rows==0)
            {
                $row = array("task_type_name" => "", "description_long" => "");


                $result->close();

                return $row;
            }
            else
            {
                $row = $result->fetch_array(MYSQLI_ASSOC);


                $result->close();

                return $row;
            }
        }
        else
        {
            $row = $result->fetch_array(MYSQLI_ASSOC);


            $result->close();

            return $row;
        }
    }

    public function get_tasks_types_descriptions_all_details_keyed_after_language($task_type_id)
    {
        $sql_query = "SELECT * FROM ".$this->Tables_Tasks_Types_Descriptions." WHERE task_type_id='".$task_type_id."'";

        $result =& $this->get_result_from_query_on_database($sql_query);

        $rows = array();

        while($row = $result->fetch_array(MYSQLI_ASSOC))
        {
            $rows[$row["language"]] = array("task_type_name" => $row["task_type_name"], "description_long" => $row["description_long"]);
        }


        $result->close();

        return $rows;
    }
    //End TABLES_TASKS_TYPES_DESCRIPTIONS

    //
    //TABLES_CONTENT
    //
    //public function insert_content_data($insert_array)
    //public function get_content_all_details($content_mapper, $language)
    //public function set_content_data($text, $content_mapper, $language)
    //public function delete_content($content_id)
    //public function get_content_only_with_fallback_language($content_mapper, $language)
    //public function get_content_all($language)
    //public function get_content_universal($language)

    public function insert_content_data($insert_array)
    {
        $this->get_next_free_id($insert_array["content_id"], $this->Tables_Content, "content_id");

        $sql_query = "INSERT INTO ".$this->Tables_Content." (".join(array_keys($insert_array),',').") VALUES (".$this->get_string_of_join_sql_values($insert_array).")";

        $this->get_result_from_query_on_database($sql_query);

        return $insert_array["content_id"];
    }

    public function get_content_all_details($content_mapper, $language)
    {
        if($language==NULL)
            $sql_query = "SELECT * FROM ".$this->Tables_Content." WHERE content_mapper='".$content_mapper."'";
        else
            $sql_query = "SELECT * FROM ".$this->Tables_Content." WHERE content_mapper='".$content_mapper."' AND language='".$language."'";

        $result =& $this->get_result_from_query_on_database($sql_query);

        $row = $result->fetch_array(MYSQLI_ASSOC);


        $result->close();

        return $row;
    }

    public function set_content_data($set_array, $content_mapper, $language)
    {
        if($language==NULL)
            $sql_query = "UPDATE ".$this->Tables_Content." SET ".$this->get_string_of_update_sql_values($set_array)." WHERE content_mapper='".$content_mapper."'";
        else
            $sql_query = "UPDATE ".$this->Tables_Content." SET ".$this->get_string_of_update_sql_values($set_array)." WHERE content_mapper='".$content_mapper."' AND language='".$language."'";

        $result =& $this->get_result_from_query_on_database($sql_query);

        return true;
    }

    public function delete_content($content_id)
    {
        $sql_query="DELETE FROM ".$this->Tables_Content." WHERE content_id='".$content_id."'";

        $result =& $this->get_result_from_query_on_database($sql_query);

        return true;
    }

    public function get_content_only_with_fallback_language($content_mapper, $language)
    {
        $sql_query = "SELECT text FROM ".$this->Tables_Content." WHERE content_mapper='".$content_mapper."' AND language='".$language."'";

        $result =& $this->get_result_from_query_on_database($sql_query);

        if($result->num_rows==0)
        {

            $result->close();

            $sql_query = "SELECT text FROM ".$this->Tables_Content." WHERE content_mapper='".$content_mapper."' AND language='".JKF_Const::getFromINI('STANDARD_LANGUAGE')."'";

            $result =& $this->get_result_from_query_on_database($sql_query);

            if($result->num_rows==0)
            {
                $row = array("text" => "");


                $result->close();

                return $row;
            }
            else
            {
                $row = $result->fetch_array(MYSQLI_ASSOC);


                $result->close();

                return $row;
            }
        }
        else
        {
            $row = $result->fetch_array(MYSQLI_ASSOC);


            $result->close();

            return $row;
        }
    }

    public function get_content_all($language)
    {
        $sql_query = "SELECT content_mapper,text,language FROM ".$this->Tables_Content." WHERE language='".$language."' OR language IS NULL";

        $result =& $this->get_result_from_query_on_database($sql_query);

        $rows = array();
        while($row = $result->fetch_array(MYSQLI_ASSOC))
        {
          $rows[] = $row;
        }

        $result->close();

        return $rows;
    }

    public function get_content_universal($language)
    {
      $sql_query = "SELECT content_mapper,text,language FROM ".$this->Tables_Content." WHERE language='".$language."' OR language IS NULL
        AND content_mapper='HOME_1'";

      $result =& $this->get_result_from_query_on_database($sql_query);

      $rows = array();
      while($row = $result->fetch_array(MYSQLI_ASSOC))
      {
        $rows[] = $row;
      }

      $result->close();

      return $rows;
    }

    //End TABLES_CONTENT

    //
    //TABLES_QUESTS
    //
    //public function insert_quests_data($insert_array)
    //public function get_quests_all_details($quest_id)
    //public function get_quests_all_details_by_questname($questname)
    //public function set_quests_data($set_array, $quest_id)
    //public function delete_quests($quest_id)
    //public function get_quests_all_all_details()
    //public function get_quests_starter_quests_all_details()
    //public function check_if_quest_exist_by_questname($questname)
    //public function delete_quests_task_id_from_json_quest_task_ids($task_id)
    //public function delete_quests_quest_id_from_json_pre_quest_ids($quest_id)
    //public function get_quests_ids_array_of_all_starter_quests()
    //public function get_quests_for_location($location_id)
    //public function get_quests_all_questnames_containing_questname($questname)
    //public function check_if_quest_exist_by_quest_id($quest_id)

    public function insert_quests_data($insert_array)
    {
        $this->get_next_free_id($insert_array["quest_id"], $this->Tables_Quests, "quest_id");

        $sql_query = "INSERT INTO ".$this->Tables_Quests." (".join(array_keys($insert_array),',').") VALUES (".$this->get_string_of_join_sql_values($insert_array).")";

        $this->get_result_from_query_on_database($sql_query);

        return $insert_array["quest_id"];
    }

    public function get_quests_all_details($quest_id)
    {
        $sql_query = "SELECT * FROM ".$this->Tables_Quests." WHERE quest_id='".$quest_id."'";

        $result =& $this->get_result_from_query_on_database($sql_query);

        if($result->num_rows==0) {throw new Exception("ERROR IN ".__FUNCTION__.": Quest unknown!");}

        $row = $result->fetch_array(MYSQLI_ASSOC);


        $result->close();

        return $row;
    }

    public function get_quests_all_details_by_questname($questname)
    {
        $sql_query = "SELECT * FROM ".$this->Tables_Quests." WHERE questname='".$questname."'";

        $result =& $this->get_result_from_query_on_database($sql_query);

        if($result->num_rows==0) {throw new Exception("ERROR IN ".__FUNCTION__.": Quest unknown!");}

        $row = $result->fetch_array(MYSQLI_ASSOC);


        $result->close();

        return $row;
    }

    public function set_quests_data($set_array, $quest_id)
    {
        $sql_query = "UPDATE ".$this->Tables_Quests." SET ".$this->get_string_of_update_sql_values($set_array)." WHERE quest_id=".$quest_id;

        $result =& $this->get_result_from_query_on_database($sql_query);

        return true;
    }

    public function delete_quests($quest_id)
    {
        $sql_query="DELETE FROM ".$this->Tables_Quests." WHERE quest_id='".$quest_id."'";

        $result =& $this->get_result_from_query_on_database($sql_query);

        return true;
    }

    public function get_quests_all_all_details()
    {
        $sql_query = "SELECT * FROM ".$this->Tables_Quests;

        $result =& $this->get_result_from_query_on_database($sql_query);

        $rows = array();

        while($row = $result->fetch_array(MYSQLI_ASSOC))
        {
            $rows[] = $row;
        }


        $result->close();

        return $rows;
    }

    public function get_quests_count()
    {
        $sql_query = "SELECT COUNT(*) FROM ".$this->Tables_Quests;

        $result =& $this->get_result_from_query_on_database($sql_query);

        $row = $result->fetch_array(MYSQLI_ASSOC);


        $result->close();

        return $row["COUNT(*)"];
    }

    public function get_quests_starter_quests_all_details()
    {
        $sql_query = "SELECT * FROM ".$this->Tables_Quests." WHERE is_starter_quest='1'";

        $result =& $this->get_result_from_query_on_database($sql_query);

        $rows = array();

        while($row = $result->fetch_array(MYSQLI_ASSOC))
        {
            $rows[] = $row;
        }


        $result->close();

        return $rows;
    }

    public function check_if_quest_exist_by_questname($questname)
    {
        $sql_query = "SELECT * FROM ".$this->Tables_Quests." WHERE questname='".$questname."'";

        $result =& $this->get_result_from_query_on_database($sql_query);

        if($result->num_rows==0) return false;
        else return true;
    }

    public function delete_quests_task_id_from_json_quest_task_ids($task_id)
    {
        $sql_query = "SELECT quest_id,json_quest_task_ids FROM ".$this->Tables_Quests." WHERE json_quest_task_ids LIKE '%".$task_id."%'";

        $result =& $this->get_result_from_query_on_database($sql_query);

        while($row = $result->fetch_array(MYSQLI_ASSOC))
        {
            $row["json_quest_task_ids"] = json_decode($row["json_quest_task_ids"], true);

            foreach ($row["json_quest_task_ids"] as $key => $array1)
            {
                foreach ($row["json_quest_task_ids"][$key] as $key2 => $value)
                {
                    if($value==$task_id)
                    {
                        $row["json_quest_task_ids"][$key][$key2] = NULL;
                        unset($row["json_quest_task_ids"][$key][$key2]);
                    }
                }
            }

            $row["json_quest_task_ids"] = json_encode($row["json_quest_task_ids"]);

            $set_array = array("json_quest_task_ids" => $row["json_quest_task_ids"]);
            $this->set_quests_data($set_array, $row["quest_id"]);
        }


        $result->close();

        return true;
    }

    public function delete_quests_quest_id_from_json_pre_quest_ids($quest_id)
    {
        $sql_query = "SELECT quest_id,json_pre_quest_ids FROM ".$this->Tables_Quests." WHERE json_pre_quest_ids LIKE '%".$quest_id."%'";

        $result =& $this->get_result_from_query_on_database($sql_query);

        while($row = $result->fetch_array(MYSQLI_ASSOC))
        {
            $row["json_pre_quest_ids"] = json_decode($row["json_pre_quest_ids"], true);

            foreach ($row["json_pre_quest_ids"] as $key => $value)
            {
                if($value==$quest_id)
                {
                    $row["json_pre_quest_ids"][$key] = NULL;
                    unset($row["json_pre_quest_ids"][$key]);
                }
            }

            $row["json_pre_quest_ids"] = json_encode($row["json_pre_quest_ids"]);

            $set_array = array("json_pre_quest_ids" => $row["json_pre_quest_ids"]);
            $this->set_quests_data($set_array, $row["quest_id"]);
        }


        $result->close();

        return true;
    }

    public function get_quests_ids_array_of_all_starter_quests()
    {
        $sql_query = "SELECT quest_id FROM ".$this->Tables_Quests." WHERE is_starter_quest='1' and is_active='1'";

        $result =& $this->get_result_from_query_on_database($sql_query);

        $rows = array();

        while($row = $result->fetch_array(MYSQLI_ASSOC))
        {
            $rows[] = $row["quest_id"];
        }


        $result->close();

        return $rows;
    }

    public function get_quests_for_location($location_id)
    {
        $sql_query = "SELECT * FROM ".$this->Tables_Quests." WHERE location_id='".$location_id."'";

        $result =& $this->get_result_from_query_on_database($sql_query);

        $rows = array();

        while($row = $result->fetch_array(MYSQLI_ASSOC))
        {
            $rows[] = $row;
        }


        $result->close();

        return $rows;
    }

    public function get_quests_all_questnames_containing_questname($questname)
    {
        $sql_query = "SELECT questname FROM ".$this->Tables_Quests." WHERE questname LIKE '".$questname."%'";

        $result =& $this->get_result_from_query_on_database($sql_query);

        $rows = array();

        while($row = $result->fetch_array(MYSQLI_ASSOC))
        {
            $rows[] = $row["questname"];
        }


        $result->close();

        return $rows;
    }

    public function get_quests_all_details_from_quest_containing_task_id($task_id)
    {
        $quests = $this->get_quests_all_all_details();
        $return_quests = array();

        foreach ($quests as $key => $quest_array)
        {
            $is_task_in_quest = false;
            $quest_array["json_quest_task_ids"] = json_decode($quest_array["json_quest_task_ids"], true);

            foreach ($quest_array["json_quest_task_ids"] as $stage_key => $quest_task_ids)
            {
                foreach ($quest_task_ids as $quest_task_key => $quest_task_id)
                {
                    if($quest_task_id == $task_id)
                        $is_task_in_quest = true;
                }
            }


            if($is_task_in_quest)
                $return_quests[] = $quest_array;
        }


        return $return_quests;
    }

    public function check_if_quest_exist_by_quest_id($quest_id)
    {
        $sql_query = "SELECT * FROM ".$this->Tables_Quests." WHERE quest_id='".$quest_id."'";

        $result =& $this->get_result_from_query_on_database($sql_query);

        if($result->num_rows==0)
        {
            return false;
        }
        return true;
    }

    //End TABLES_QUESTS

    //
    //TABLES_QUESTS_DESCRIPTIONS
    //
    //public function insert_quests_descriptions_data($insert_array)
    //public function get_quests_descriptions_all_details($quest_id, $language)
    //public function set_quests_descriptions_data($set_array, $quest_id, $language)
    //public function delete_quests_descriptions($quest_id, $language)
    //public function delete_quests_descriptions_all_entity_containing_quest_id($quest_id)
    //public function get_quests_descriptions_description_only_with_fallback_language($quest_id, $language)
    //public function get_quests_descriptions_all_details_keyed_after_language($quest_id)
    //public function get_quests_descriptions_quest_id_from_questname($questname)
    //public function get_quests_descriptions_all_questnames_containing_questname($questname, $language)

    public function insert_quests_descriptions_data($insert_array)
    {
        $sql_query = "INSERT INTO ".$this->Tables_Quests_Descriptions." (".join(array_keys($insert_array),',').") VALUES (".$this->get_string_of_join_sql_values($insert_array).")";

        $this->get_result_from_query_on_database($sql_query);

        return true;
    }

    public function get_quests_descriptions_all_details($quest_id, $language)
    {
        $sql_query = "SELECT * FROM ".$this->Tables_Quests_Descriptions." WHERE quest_id='".$quest_id."' AND language='".$language."'";

        $result =& $this->get_result_from_query_on_database($sql_query);

        $row = $result->fetch_array(MYSQLI_ASSOC);


        $result->close();

        return $row;
    }

    public function set_quests_descriptions_data($set_array, $quest_id, $language)
    {
        $sql_query = "UPDATE ".$this->Tables_Quests_Descriptions." SET ".$this->get_string_of_update_sql_values($set_array)." WHERE quest_id=".$quest_id." AND language='$language'";

        $result =& $this->get_result_from_query_on_database($sql_query);

        return true;
    }

    public function delete_quests_descriptions($quest_id, $language)
    {
        $sql_query="DELETE FROM ".$this->Tables_Quests_Descriptions." WHERE quest_id='".$quest_id."' AND language='".$language."'";

        $result =& $this->get_result_from_query_on_database($sql_query);

        return true;
    }

    public function delete_quests_descriptions_all_entity_containing_quest_id($quest_id)
    {
        $sql_query="DELETE FROM ".$this->Tables_Quests_Descriptions." WHERE quest_id='".$quest_id."'";

        $result =& $this->get_result_from_query_on_database($sql_query);

        return true;
    }

    public function get_quests_descriptions_description_only_with_fallback_language($quest_id, $language)
    {
        $sql_query = "SELECT questname,description_long,solved_description FROM ".$this->Tables_Quests_Descriptions." WHERE quest_id='".$quest_id."' AND language='".$language."'";

        $result =& $this->get_result_from_query_on_database($sql_query);

        if($result->num_rows==0)
        {

            $result->close();

            $sql_query = "SELECT questname,description_long,solved_description FROM ".$this->Tables_Quests_Descriptions." WHERE quest_id='".$quest_id."' AND language='".JKF_Const::getFromINI('STANDARD_LANGUAGE')."'";

            $result =& $this->get_result_from_query_on_database($sql_query);

            if($result->num_rows==0)
            {
                $row = array("questname" => "", "description_long" => "", "solved_description" => "");


                $result->close();

                return $row;
            }
            else
            {
                $row = $result->fetch_array(MYSQLI_ASSOC);


                $result->close();

                return $row;
            }
        }
        else
        {
            $row = $result->fetch_array(MYSQLI_ASSOC);


            $result->close();

            return $row;
        }
    }

    public function get_quests_descriptions_all_details_keyed_after_language($quest_id)
    {
        $sql_query = "SELECT * FROM ".$this->Tables_Quests_Descriptions." WHERE quest_id='".$quest_id."'";

        $result =& $this->get_result_from_query_on_database($sql_query);

        $rows = array();

        while($row = $result->fetch_array(MYSQLI_ASSOC))
        {
            $rows[$row["language"]] = array("questname" => $row["questname"], "description_long" => $row["description_long"], "solved_description" => $row["solved_description"]);
        }

        $result->close();

        return $rows;
    }

    public function get_quests_descriptions_quest_id_from_questname($questname)
    {
        $sql_query = "SELECT * FROM ".$this->Tables_Quests_Descriptions." WHERE questname='".$questname."'";

        $result =& $this->get_result_from_query_on_database($sql_query);

        if($result->num_rows==0) {throw new Exception("ERROR IN ".__FUNCTION__.": Quest unknown!");}

        $row = $result->fetch_array(MYSQLI_ASSOC);

        $result->close();

        return $row["quest_id"];
    }

    public function get_quests_descriptions_all_questnames_containing_questname($questname, $language)
    {
        $sql_query = "SELECT questname FROM ".$this->Tables_Quests_Descriptions." WHERE language='".$language."' AND questname LIKE '".$questname."%'";

        $result =& $this->get_result_from_query_on_database($sql_query);

        $rows = array();

        while($row = $result->fetch_array(MYSQLI_ASSOC))
        {
            $rows[] = $row["questname"];
        }


        $result->close();

        return $rows;
    }

    //End TABLES_QUESTS_DESCRIPTIONS

    //
    //TABLES_QUESTS
    //
    //public function insert_daily_tasks_data($insert_array)
    //public function get_daily_tasks_all_details($daily_task_id)
    //public function set_daily_tasks_data($set_array, $daily_task_id)
    //public function delete_daily_tasks($daily_task_id)
    //public function get_daily_tasks_all_details_from_today()
    //public function insert_daily_tasks_special_for_day($task_id, $date, $month, $year)
    //public function check_if_daily_task_exist_for_day($date, $month, $year)
    //public function get_daily_tasks_all_tasks_for_future()
    //public function check_if_daily_task_is_completed_by_user_id($daily_task_id, $user_id)
    //public function set_daily_tasks_new_solved_user_id($daily_task_id, $user_id)

    public function insert_daily_tasks_data($insert_array)
    {
        $this->get_next_free_id($insert_array["daily_task_id"], $this->Tables_Daily_Tasks, "daily_task_id");

        $sql_query = "INSERT INTO ".$this->Tables_Daily_Tasks." (".join(array_keys($insert_array),',').") VALUES (".$this->get_string_of_join_sql_values($insert_array).")";

        $this->get_result_from_query_on_database($sql_query);

        return $insert_array["daily_task_id"];
    }

    public function get_daily_tasks_all_details($daily_task_id)
    {
        $sql_query = "SELECT * FROM ".$this->Tables_Daily_Tasks." WHERE daily_task_id='".$daily_task_id."'";

        $result =& $this->get_result_from_query_on_database($sql_query);

        if($result->num_rows==0) {throw new Exception("ERROR IN ".__FUNCTION__.": Daily_Task unknown!");}

        $row = $result->fetch_array(MYSQLI_ASSOC);


        $result->close();

        return $row;
    }

    public function set_daily_tasks_data($set_array, $daily_task_id)
    {
        $sql_query = "UPDATE ".$this->Tables_Daily_Tasks." SET ".$this->get_string_of_update_sql_values($set_array)." WHERE daily_task_id=".$daily_task_id;

        $result =& $this->get_result_from_query_on_database($sql_query);

        return true;
    }

    public function delete_daily_tasks($daily_task_id)
    {
        $sql_query="DELETE FROM ".$this->Tables_Daily_Tasks." WHERE daily_task_id='".$daily_task_id."'";

        $result =& $this->get_result_from_query_on_database($sql_query);

        return true;
    }

    /*public function get_daily_tasks_all_details_from_today()
    {
        $sql_query = "SELECT * FROM ".$this->Tables_Daily_Tasks." WHERE DATE(ts_day)=DATE(NOW())";

        $result =& $this->get_result_from_query_on_database($sql_query);

        if($result->num_rows==0)
        {
            $new_daily_task = $this->get_tasks_random_mulitple_solvable_daily_task();

            if(count($new_daily_task)==0)
                return array();

            $insert_array = array(
               "task_id" => $new_daily_task["task_id"],
               "json_solved_by_user_ids" => json_encode(array()),
               "ts_day" => "NOW()"
            );

            $this->insert_daily_tasks_data($insert_array);

            return $insert_array;
        }
        else
        {
            $row = $result->fetch_array(MYSQLI_ASSOC);


            $result->close();

            return $row;
        }
    }*/

    public function insert_daily_tasks_special_for_day($task_id, $date, $month, $year)
    {
        $next_free_id = 0;
        if(!$this->get_next_free_id($next_free_id, $this->Tables_Daily_Tasks, "daily_task_id"))
        {
            throw new Exception("ERROR IN ".__FUNCTION__."");
        }

        if($this->check_if_daily_task_exist_for_day($date, $month, $year))
        {
            return false;
        }

        $sql_query = "INSERT ".$this->Tables_Daily_Tasks."(daily_task_id,task_id,json_solved_by_user_ids,ts_day) VALUES ('$next_free_id','$task_id','[]','$year-$month-$date 01:01:01')";

        $result =& $this->get_result_from_query_on_database($sql_query);

        return true;
    }

    public function check_if_daily_task_exist_for_day($date, $month, $year)
    {
        $sql_query = "SELECT * FROM ".$this->Tables_Daily_Tasks." WHERE DATE(ts_day)=DATE('$year-$month-$date 01:01:01')";

        $result =& $this->get_result_from_query_on_database($sql_query);

        if($result->num_rows==0) return false;
        else return true;
    }

    public function get_daily_tasks_all_tasks_for_future()
    {
        $sql_query = "SELECT * FROM ".$this->Tables_Daily_Tasks." WHERE DATEDIFF(NOW(),ts_day)<0";

        $result =& $this->get_result_from_query_on_database($sql_query);

        $rows = array();

        while($row = $result->fetch_array(MYSQLI_ASSOC))
        {
            $rows[] = $row;
        }


        $result->close();

        return $rows;
    }

    public function check_if_daily_task_is_completed_by_user_id($daily_task_id, $user_id)
    {
        $daily_task_data = $this->get_daily_tasks_all_details($daily_task_id);
        $daily_task_data["json_solved_by_user_ids"] = json_decode($daily_task_data["json_solved_by_user_ids"],true);

        foreach ($daily_task_data["json_solved_by_user_ids"] as $key => $userId)
        {
            if($user_id==$userId) return true;
        }
        return false;
    }

    public function set_daily_tasks_new_solved_user_id($daily_task_id, $user_id)
    {
        $daily_task_data = $this->get_daily_tasks_all_details($daily_task_id);
        $daily_task_data["json_solved_by_user_ids"] = json_decode($daily_task_data["json_solved_by_user_ids"],true);

        if(!$this->check_if_daily_task_is_completed_by_user_id($daily_task_id, $user_id))
        {
            $daily_task_data["json_solved_by_user_ids"][] = $user_id;
        }

        $daily_task_data["json_solved_by_user_ids"] = json_encode($daily_task_data["json_solved_by_user_ids"]);
        $set_array = array(
           "json_solved_by_user_ids" => $daily_task_data["json_solved_by_user_ids"]
        );

        $this->set_daily_tasks_data($set_array, $daily_task_id);

        return true;
    }

    //End TABLES_QUESTS

    //
    //TABLES_USER_QUEST
    //
    //public function insert_user_quest_data($insert_array)
    //public function get_user_quest_all_details($user_id, $quest_id)
    //public function set_user_quest_data($set_array, $user_id, $quest_id)
    //public function delete_user_quest($user_id, $quest_id)
    //public function delete_user_quest_all_entity_containing_user_id($user_id)
    //public function delete_user_quest_all_entity_containing_quest_id($quest_id)
    //public function get_user_quest_all_from_user_id($user_id)
    //public function get_user_quest_all_user_ids_from_quest_id($quest_id)
    //public function get_user_quest_last_completed_quests($user_id, $count)
    //public function get_user_quest_all_completed_quests($user_id)

    public function insert_user_quest_data($insert_array)
    {
        if(!isset($insert_array["quest_id"]) || !isset($insert_array["user_id"]))
        {
            throw new Exception("ERROR IN ".__FUNCTION__."");
        }

        if($this->check_if_entity_exists($this->Tables_User_Quest, array(0 => '*'), array("user_id" => $insert_array["user_id"], "quest_id" => $insert_array["quest_id"])))
        {
            throw new Exception("ERROR IN ".__FUNCTION__."");
        }

        $sql_query = "INSERT INTO ".$this->Tables_User_Quest." (".join(array_keys($insert_array),',').") VALUES (".$this->get_string_of_join_sql_values($insert_array).")";

        $this->get_result_from_query_on_database($sql_query);

        return true;
    }

    public function get_user_quest_all_details($user_id, $quest_id)
    {
        $sql_query = "SELECT * FROM ".$this->Tables_User_Quest." WHERE user_id='".$user_id."' AND quest_id='".$quest_id."'";

        $result =& $this->get_result_from_query_on_database($sql_query);

        $row;
        if($result->num_rows==0)
        {

            $result->close();

            $sql_query = "SELECT * FROM ".$this->Tables_Quests." WHERE quest_id='".$quest_id."'";
            $result =& $this->get_result_from_query_on_database($sql_query);
            if($result->num_rows==0) throw new Exception("ERROR IN ".__FUNCTION__);

            $result->close();

            $sql_query = "SELECT * FROM ".$this->Tables_Users." WHERE user_id='".$user_id."'";
            $result =& $this->get_result_from_query_on_database($sql_query);
            if($result->num_rows==0) throw new Exception("ERROR IN ".__FUNCTION__);

            $result->close();

            $insert_array = array(
               "user_id" => $user_id,
               "quest_id" => $quest_id,
               "completed" => 0,
               "ts_quest_completed" => NULL
            );

            $row = $insert_array;

            $this->insert_user_quest_data($insert_array);
        }
        else
        {
            $row = $result->fetch_array(MYSQLI_ASSOC);


            $result->close();
        }

        return $row;
    }

    public function set_user_quest_data($set_array, $user_id, $quest_id)
    {
        $sql_query = "UPDATE ".$this->Tables_User_Quest." SET ".$this->get_string_of_update_sql_values($set_array)." WHERE user_id=".$user_id." AND quest_id=".$quest_id;

        $result =& $this->get_result_from_query_on_database($sql_query);

        return true;
    }

    public function delete_user_quest($user_id, $quest_id)
    {
        $sql_query="DELETE FROM ".$this->Tables_User_Quest." WHERE user_id='".$user_id."' AND quest_id='".$quest_id."'";

        $result =& $this->get_result_from_query_on_database($sql_query);

        return true;
    }

    public function delete_user_quest_all_entity_containing_user_id($user_id)
    {
        $sql_query="DELETE FROM ".$this->Tables_User_Quest." WHERE user_id='".$user_id."'";

        $result =& $this->get_result_from_query_on_database($sql_query);

        return true;
    }

    public function delete_user_quest_all_entity_containing_quest_id($quest_id)
    {
        $sql_query="DELETE FROM ".$this->Tables_User_Quest." WHERE quest_id='".$quest_id."'";

        $result =& $this->get_result_from_query_on_database($sql_query);

        return true;
    }

    public function get_user_quest_all_from_user_id($user_id)
    {
        $sql_query = "SELECT * FROM ".$this->Tables_User_Quest." WHERE user_id='".$user_id."'";

        $result =& $this->get_result_from_query_on_database($sql_query);

        $rows = array();
        $row = array();
        while($row = $result->fetch_array(MYSQLI_ASSOC))
        {
            $rows[] = $row;
        }


        $result->close();

        return $rows;
    }

    public function get_user_quest_all_user_ids_from_quest_id($quest_id)
    {
        $sql_query = "SELECT * FROM ".$this->Tables_User_Quest." WHERE quest_id='".$quest_id."'";

        $result =& $this->get_result_from_query_on_database($sql_query);

        $rows = array();
        $row = array();
        while($row = $result->fetch_array(MYSQLI_ASSOC))
        {
            $rows[] = $row;
        }


        $result->close();

        return $rows;
    }

    public function get_user_quest_last_completed_quests($user_id, $count)
    {
        $sql_query = "SELECT * FROM ".$this->Tables_User_Quest." WHERE user_id='".$user_id."' AND completed='1' ORDER BY ts_quest_completed DESC LIMIT ".$count;

        $result =& $this->get_result_from_query_on_database($sql_query);

        $rows = array();
        $row = array();
        while($row = $result->fetch_array(MYSQLI_ASSOC))
        {
            $rows[] = $row;
        }


        $result->close();

        return $rows;
    }

    public function is_quest_completed_for_user_id($user_id, $quest_id)
    {
        $user_quest = $this->get_user_quest_all_details($user_id, $quest_id);

        if($user_quest["completed"]==1) return true;
        else return false;
    }

    public function get_user_quest_all_completed_quests($user_id)
    {
        $sql_query = "SELECT * FROM ".$this->Tables_User_Quest." WHERE user_id='".$user_id."' AND completed='1'";

        $result =& $this->get_result_from_query_on_database($sql_query);

        $rows = array();

        while($row = $result->fetch_array(MYSQLI_ASSOC))
        {
            $rows[] = $row;
        }


        $result->close();

        return $rows;
    }

    //End TABLES_USER_QUEST

    //
    //TABLES_BLOCKED_TASKS
    //
    //public function insert_blocked_tasks_data($insert_array)
    //public function get_blocked_tasks_all_details($user_id, $task_id)
    //public function set_blocked_tasks_data($set_array, $user_id, $task_id)
    //public function delete_blocked_tasks($user_id, $task_id)
    //public function check_if_task_is_blocked_for_user_id($user_id, $task_id)
    //public function add_blocked_tasks_for_user_if_blocked_task_not_exist($user_id, $task_id)

    public function insert_blocked_tasks_data($insert_array)
    {
        if(!isset($insert_array["blocked_task_id"]) && !$this->get_next_free_id($insert_array["blocked_task_id"], $this->Tables_Blocked_Tasks, "blocked_task_id"))
        {
            throw new Exception("ERROR IN ".__FUNCTION__."");
        }

        if(!isset($insert_array["task_id"]) || !isset($insert_array["user_id"]))
        {
            throw new Exception("ERROR IN ".__FUNCTION__."");
        }

        $sql_query = "INSERT INTO ".$this->Tables_Blocked_Tasks." (".join(array_keys($insert_array),',').") VALUES (".$this->get_string_of_join_sql_values($insert_array).")";

        $this->get_result_from_query_on_database($sql_query);

        return true;
    }

    public function get_blocked_tasks_all_details($user_id, $task_id)
    {
        $sql_query = "SELECT * FROM ".$this->Tables_Blocked_Tasks." WHERE user_id='".$user_id."' AND task_id='".$task_id."'";

        $result =& $this->get_result_from_query_on_database($sql_query);

        if($result->num_rows==0)
        {
            return array();
        }
        else
        {
            $row = $result->fetch_array(MYSQLI_ASSOC);

            //check if task is free right now
            $blocked_task_time = strtotime($row["ts_blocked"]);
            if($blocked_task_time+self::$TimeInSecondsUntilAMultipleSolvableTaskIsAgainSolvable<=time())
            {
                $this->delete_blocked_tasks($user_id, $task_id);
                return array();
            }


            $result->close();

            return $row;
        }
    }

    public function set_blocked_tasks_data($set_array, $user_id, $task_id)
    {
        $sql_query = "UPDATE ".$this->Tables_Blocked_Tasks." SET ".$this->get_string_of_update_sql_values($set_array)." WHERE user_id=".$user_id." AND task_id=".$task_id;

        $result =& $this->get_result_from_query_on_database($sql_query);

        return true;
    }

    public function delete_blocked_tasks($user_id, $task_id)
    {
        $sql_query="DELETE FROM ".$this->Tables_Blocked_Tasks." WHERE user_id='".$user_id."' AND task_id='".$task_id."'";

        $result =& $this->get_result_from_query_on_database($sql_query);

        return true;
    }

    public function check_if_task_is_blocked_for_user_id($user_id, $task_id)
    {
        $blocked_task_data = $this->get_blocked_tasks_all_details($user_id, $task_id);

        if(count($blocked_task_data)==0) return false;
        return true;
    }

    public function add_blocked_tasks_for_user_if_blocked_task_not_exist($user_id, $task_id)
    {
        $blocked_task_data = $this->get_blocked_tasks_all_details($user_id, $task_id);

        if(count($blocked_task_data)==0)
        {
            $insert_array = array(
               "user_id" => $user_id,
               "task_id" => $task_id,
               "ts_blocked" => "NOW()"
            );

            $this->insert_blocked_tasks_data($insert_array);
        }

        return true;
    }

    //End TABLES_BLOCKED_TASKS


    //
    //TABLES_USER_SESSION
    //
    //public function insert_user_session_data($insert_array)
    //public function get_user_session_all_details_from_session_hash_id($session_hash_id)
    //public function set_user_session_data($set_array, $session_hash_id)
    //public function delete_user_session($session_hash_id)
    //public function check_if_session_hash_id_already_exists($session_hash_id)
    //public function get_user_session_next_free_session_hash_id($user_id)

    public function insert_user_session_data($insert_array)
    {
        if(!isset($insert_array["user_id"]))
        {
            throw new Exception("FEHLER IN ".__FUNCTION__."");
        }

        $insert_array["session_hash_id"] = $this->get_user_session_next_free_session_hash_id($insert_array["user_id"]);

        $sql_query = "INSERT INTO ".$this->Tables_User_Session." (".join(array_keys($insert_array),',').") VALUES (".$this->get_string_of_join_sql_values($insert_array).")";

        $this->get_result_from_query_on_database($sql_query);

        return $insert_array["session_hash_id"];
    }

    public function get_user_session_all_details_from_session_hash_id($session_hash_id)
    {
        $sql_query = "SELECT * FROM ".$this->Tables_User_Session." WHERE session_hash_id='".$session_hash_id."'";

        $result =& $this->get_result_from_query_on_database($sql_query);

        if($result->num_rows==0) {throw new Exception("ERROR IN ".__FUNCTION__);}

        $row = $result->fetch_array(MYSQLI_ASSOC);


        $result->close();

        return $row;
    }

    public function set_user_session_data($set_array, $session_hash_id)
    {
        $sql_query="UPDATE ".$this->Tables_User_Session." SET ";
        foreach($set_array as $key => $value)
        {
                if($value=="NOW()")
                {
                        $sql_query .= "$key=$value,";
                }
                else
                {
                        $sql_query .= "$key='$value',";
                }
        }
        $sql_query = substr($sql_query, 0, -1);  //letztes Komma wieder abziehen
        $sql_query .= " WHERE session_hash_id='".$session_hash_id."'";


        $result =& $this->get_result_from_query_on_database($sql_query);

        if($result==false) {throw new Exception("ERROR IN ".__FUNCTION__."");}

        return true;
    }

    public function delete_user_session($session_hash_id)
    {
        $sql_query="DELETE FROM ".$this->Tables_User_Session." WHERE session_hash_id='".$session_hash_id."'";

        $result =& $this->get_result_from_query_on_database($sql_query);

        if($result==false) {throw new Exception("ERROR IN ".__FUNCTION__."");}

        return true;
    }

    public function check_if_session_hash_id_already_exists($session_hash_id)
    {
        $sql_query = "SELECT * FROM ".$this->Tables_User_Session." WHERE session_hash_id='".$session_hash_id."'";

        $result =& $this->get_result_from_query_on_database($sql_query);

        if($result->num_rows==0) return false;
        else return true;
    }

    public function get_user_session_next_free_session_hash_id($user_id)
    {
        $return_session_hash_id = "";
        for ($i = 0; $i < 100; $i++)
        {

            $temp_session_hash_id = sha1($user_id . time() . $i);

            if(!$this->check_if_session_hash_id_already_exists($temp_session_hash_id))
            {
                $return_session_hash_id = $temp_session_hash_id;
                break;
            }
        }

        if($return_session_hash_id == "")
        {
            throw new Exception("ERROR IN ".__FUNCTION__);
        }
        else
        {
            return $return_session_hash_id;
        }
    }

    //End TABLES_USER_SESSION

    //
    //TABLES_PICTURES
    //
    //public function insert_pictures_data($insert_array)
    //public function get_pictures_all_details($location_id)
    //public function get_pictures_all_all_details();
    public function insert_pictures_data($insert_array)
    {
        $this->get_next_free_id($insert_array["picture_id"], $this->Tables_Pictures, "picture_id");

        $sql_query = "INSERT INTO ".$this->Tables_Pictures." (".join(array_keys($insert_array),',').") VALUES (".$this->get_string_of_join_sql_values($insert_array).")";

        $this->get_result_from_query_on_database($sql_query);

        return $insert_array["picture_id"];
    }

    public function get_pictures_all_details($picture_id)
    {
        $sql_query = "SELECT * FROM ".$this->Tables_Pictures." WHERE picture_id='".$picture_id."'";

        $result =& $this->get_result_from_query_on_database($sql_query);

        if($result->num_rows==0) {throw new Exception("ERROR IN ".__FUNCTION__.": Picture unknown!");}

        $row = $result->fetch_array(MYSQLI_ASSOC);

        $result->close();

        return $row;
    }

    public function get_pictures_all_all_details()
    {
        $sql_query = "SELECT picture_id, picturename, type, ts_upload FROM ".$this->Tables_Pictures." ORDER BY picturename ASC";

        $result =& $this->get_result_from_query_on_database($sql_query);

        $rows = array();

        while($row = $result->fetch_array(MYSQLI_ASSOC))
        {
          $rows[] = $row;
        }

        $result->close();

        return $rows;
    }
    //End TABLES_PICTURES


    //public function create_overall_new_user($username, $pwt, $email, $faculty_id)
    //public function check_for_registration($username, $email, $pwt, $pwt_repeat, $faculty_id)
    //public function check_for_registration_for_anonymous_user($username, $email, $pwt, $pwt_repeat, $faculty_id)
    //public function login_user($username, $pwt)
    //public function logout_user()
    //public function check_user()
    //public function check_if_mail_exists($email)
    //public function check_if_username_exists($username)
    //public function get_user_id_from_session()
    //public function update_statistics_for_user_id($user_id, $statistic_type_id)
    //public function update_statistics_administration($statistic_type_id)
    //public function update_faculty_score($faculty_id)
    //public function update_user_score($user_id)
    //public function update_user_badge($user_id, $task_id)
    //public function update_user_quest($user_id)
    //public function update_completed_tasks($user_id)
    //public function update_completed_badges($user_id)
    //public function update_completed_quests($user_id)
    //public function update_active_tasks_quests($user_id, $task_array, $quest_array)
    //public function add_task_progress_to_user($user_id, $task_id, $to_add)
    //public function has_user_completed_task($user_id, $task_id)
    //public function get_users_all_details_after_score($limit)
    //public function get_users_all_details_after_score_for_faculty_id($faculty_id, $limit)
    //public function get_user_last_completed_badges_all_details($user_id, $language, $limit)
    //public function get_user_last_completed_tasks_all_details($user_id, $language, $limit)
    //public function get_tasks_sorted_after_type_and_user_task_info_for_user_id($user_id, $language)
    //public function get_tasks_completed_tasks_for_user_id($user_id)
    //public function get_task_all_details_with_descriptions($task_id, $language)
    //public function get_quest_pre_quests_description_with_completion_statement($user_id, $quest_id)
    //public function get_users_sorted_after_user_score_with_faculty($low, $high)
    //public function get_users_sorted_after_user_score();
    //public function get_tasks_types_all_task_types_with_description($language)
    //public function check_if_task_exist_by_taskname($taskname)
    //public function check_if_badge_exist_by_badgename($badgename)
    //public function delete_overall_user($user_id)
    //public function delete_overall_task($task_id)
    //public function delete_overall_quest($quest_id)
    //public function delete_overall_location($location_id)
    //public function get_tasks_all_details_active_tasks_for_user_id($user_id, $language)
    //public function get_quests_all_details_active_quests_for_user_id($user_id, $language)
    //public function get_active_task_ids_for_active_quests_for_user_id($user_id)
    //public function get_quests_all_details_active_starter_quests_for_user_id($user_id, $language)
    //public function get_quests_progress_for_quest_id_user_id($user_id, $quest_id)
    //public function get_task_completed_true_false_statement($user_id, $task_id)
    //public function get_task_daily_task_with_descriptions_if_user_has_not_completed($user_id, $language)
    //public function check_for_new_tasks_with_location($user_id, $geo_lati, $geo_long)
    //public function check_for_new_quests_with_location($user_id, $geo_lati, $geo_long)
    //public function check_for_user_tasks_to_solve_with_location($user_id, $geo_lati, $geo_long)
    //public function get_tasks_all_task_data_with_all_descriptions()
    //public function get_badges_all_badge_data_with_all_descriptions()
    //public function get_users_count_completed_all_badges()
    //public function get_users_count_completed_all_quests()
    //public function create_new_anonymous_user()
    //public function update_users_delete_all_inactive_anonymous_user()
    //public function login_anonymous_user($username)
    //public function send_new_password_and_username_to_user($email)
    //public function get_locations_with_description_where_user_id_can_find_tasks($user_id, $language)
    //public function set_quest_active_for_all_users($quest_id)
    //public function get_task_data_from_next_task_in_quest_for_user_id($user_id, $task_id, $language)


    public function create_overall_new_user($username, $pwt, $email, $faculty_id)
    {
        //HOECHSTE ID aus $USER_PRIVATE["USER"] erfragen
        $new_user_id = 1;
        if(!$this->get_next_free_id($new_user_id, $this->Tables_Users, "user_id"))
        {
            throw new Exception("ERROR IN ".__FUNCTION__."");
        }



        //$this->Tables_User einfuegen
        $pwt_addition = substr(md5(rand()), 0, 10);
        $insert_array = array(
            "user_id" => $new_user_id,
            "username" => $username,
            "email" => $email,
            "pwd_addition" => $pwt_addition,
            "pwd_login" => md5($pwt . $pwt_addition),
            "user_type_id" => 0,
            "language" => "de_DE",
            "user_score" => 0,
            "completed_tasks" => 0,
            "completed_badges" => 0,
            "json_active_quest_ids" => json_encode($this->get_quests_ids_array_of_all_starter_quests()),
            "json_active_task_ids" => json_encode(array()),
            "ts_active" => "NOW()",
            "ts_registration" => "NOW()",
            "faculty_id" => $faculty_id,
            "is_user_active" => 1);
        $this->insert_users_data($insert_array);

        return true;
    }

    public function check_for_registration($username, $email, $pwt, $pwt_repeat, $faculty_id)
    {
        if(!$this->validation_check_for_username($username))
        {
            $notAllowedCharactersString = "";
            foreach ($this->NotAllowedCharacters as $key => $notAllowedCharacter)
            {
                $notAllowedCharactersString .= " '".$notAllowedCharacter."'";
            }
            throw new Exception("Validation check for username failed. Maybe you have used on of the following not allowed characters: ".$notAllowedCharactersString);
        }


        if ($this->check_if_mail_exists($email) || !preg_match("/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/", $email))
        {
            throw new Exception("Your E-Mail was wrong!");
        }

        if ($this->check_if_username_exists($username) || !preg_match("/^([A-Za-z0-9]{2,})$/", $username))
        {
            throw new Exception("The username is already taken or does not meet the standard!");
        }

        if ($pwt != $pwt_repeat)
        {
            throw new Exception("The passwords were not equal!");
        }

        if (!$this->validation_check_pw($pwt))
        {
            throw new Exception("The password does not meet the standards!");
        }

        if(!$this->check_if_faculty_exists($faculty_id))
        {
            throw new Exception("This Department does not exist!");
        }


        //User initialisieren
        $this->create_overall_new_user($username, $pwt, $email, $faculty_id);
    }

    public function check_for_registration_for_anonymous_user($user_id, $username, $email, $pwt, $pwt_repeat, $faculty_id)
    {
        if(!$this->validation_check_for_username($username))
        {
            $notAllowedCharactersString = "";
            foreach ($this->NotAllowedCharacters as $key => $notAllowedCharacter)
            {
                $notAllowedCharactersString .= " '".$notAllowedCharacter."'";
            }
            throw new Exception(gettext("Validation check for username failed. Maybe you have used on of the following not allowed characters: ").$notAllowedCharactersString);
        }



        if ($this->check_if_mail_exists($email) || !preg_match("/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/", $email))
        {
            throw new Exception(gettext("Your E-Mail was wrong!"));
        }

        if ($this->check_if_username_exists($username) || !preg_match("/^([A-Za-z0-9]{2,})$/", $username))
        {
            throw new Exception(gettext("The username is already taken or does not meet the standard!"));
        }

        if ($pwt != $pwt_repeat)
        {
            throw new Exception(gettext("The passwords were not equal!"));
        }

        if (!$this->validation_check_pw($pwt))
        {
            throw new Exception(gettext("The password does not meet the standards (At least 10 characters, at least 1 letter, at least 1 number)!"));
        }

        if(!$this->check_if_faculty_exists($faculty_id))
        {
            throw new Exception(gettext("This Department does not exist!"));
        }

        //Check if user existis
        $this->get_users_username($user_id);

        //User initialisieren
        $pwt_addition = substr(md5(rand()), 0, 10);
        $set_array = array(
            "user_id" => $user_id,
            "username" => $username,
            "email" => $email,
            "pwd_addition" => $pwt_addition,
            "pwd_login" => md5($pwt . $pwt_addition),
            "ts_registration" => "NOW()",
            "faculty_id" => $faculty_id);

        $this->set_users_data($set_array, $user_id);

    }

    public function login_user($username, $pwt)
    {
        //user_id erhalten, gleichzeitig auch testen, ob User vorhanden
        try {
        $user_id = $this->get_users_user_id($username);
        }
        catch(Exception $e)
        {
            throw new Exception("ERROR");
        }

        //USERDATEN AUSLESEN
        $user_daten = $this->get_users_all_details($user_id);

        if (md5($pwt . $user_daten["pwd_addition"]) != $user_daten["pwd_login"])
        {
            throw new Exception("ERROR");
        }


        //ANMELDEN
        $set_array = array("ts_active" => "NOW()");

        if (!$this->set_users_data($set_array, $user_id))
        {
            throw new Exception("ERROR");
        }

        //insert _User_Session
        $insert_array = array(
           "user_id" => $user_id,
           "json_data" => json_encode(array("ts" => time(), "agent" => md5($_SERVER["HTTP_USER_AGENT"]))),
           "ts" => "NOW()"
        );

        $session_hash_id = $this->insert_user_session_data($insert_array);

        //set Cookie
        setcookie($this->NAME_OF_USER_COOKIE, $session_hash_id, time()+60*60*24*365, "/");

        return true;
    }

    public function logout_user()
    {
        if($this->validation_check_for_session_hash_id($_COOKIE[$this->NAME_OF_USER_COOKIE]))
        {
            $this->delete_user_session($_COOKIE[$this->NAME_OF_USER_COOKIE]);
        }

        $_COOKIE[$this->NAME_OF_USER_COOKIE] = NULL;
        unset($_COOKIE[$this->NAME_OF_USER_COOKIE]);
        setcookie($this->NAME_OF_USER_COOKIE, null, -1, "/");

        return true;
    }

    public function check_user()
    {
        if(!isset($_COOKIE[$this->NAME_OF_USER_COOKIE])) {
          return false;
        }

        $session_hash_id = $_COOKIE[$this->NAME_OF_USER_COOKIE];
        $user_session_data = array();
        $user_id = -1;

        if(!$this->validation_check_for_session_hash_id($session_hash_id))
        {
            return false;
        }

        try {
            $user_session_data = $this->get_user_session_all_details_from_session_hash_id($session_hash_id);

            $user_id = $user_session_data["user_id"];
            $user_session_data["json_data"] = json_decode($user_session_data["json_data"],true);
        }
        catch (Exception $exc)
        {
          $_COOKIE[$this->NAME_OF_USER_COOKIE] = NULL;
          unset($_COOKIE[$this->NAME_OF_USER_COOKIE]);
          setcookie($this->NAME_OF_USER_COOKIE, null, -1, "/");
          return false;
        }


        //Compare Agents
        if ($user_session_data["json_data"]["agent"] != md5($_SERVER["HTTP_USER_AGENT"]))
        {
            $this->delete_user_session($user_session_data["session_hash_id"]);

            return false;
        }

        $set_array = array(
           "json_data" => json_encode(array("ts" => time(), "agent" => md5($_SERVER["HTTP_USER_AGENT"])))
        );

        if (!$this->set_user_session_data($set_array, $session_hash_id))
        {
            throw new Exception("ERROR");
        }

        //Load User_Data
        try {
          $this->User_Data = $this->get_users_all_details($user_id);
        }
        catch (Exception $exc)
        {
          $_COOKIE[$this->NAME_OF_USER_COOKIE] = NULL;
          unset($_COOKIE[$this->NAME_OF_USER_COOKIE]);
          setcookie($this->NAME_OF_USER_COOKIE, null, -1, "/");
          return false;
        }

        return true;
    }

    public function check_if_mail_exists($email)
    {
        $sql_query = "SELECT * FROM ".$this->Tables_Users." WHERE email='".$email."'";

        $result =& $this->get_result_from_query_on_database($sql_query);

        $row = $result->fetch_array(MYSQLI_ASSOC);

        if($result->num_rows==0) return false;
        return true;
    }

    public function check_if_username_exists($username)
    {
        $sql_query = "SELECT * FROM ".$this->Tables_Users." WHERE username='".$username."'";

        $result =& $this->get_result_from_query_on_database($sql_query);

        $row = $result->fetch_array(MYSQLI_ASSOC);

        if($result->num_rows==0) return false;
        return true;
    }

    public function get_user_id_from_session()
    {
        $session_hash_id = $_COOKIE[$this->NAME_OF_USER_COOKIE];
        $user_session_data = array();

        if(!$this->validation_check_for_session_hash_id($session_hash_id))
        {
            return NULL;
        }

        try {
            $user_session_data = $this->get_user_session_all_details_from_session_hash_id($session_hash_id);

            return $user_session_data["user_id"];
        }
        catch (Exception $exc)
        {
            return NULL;
        }
    }

    public function update_statistics_for_user_id($user_id, $statistic_type_id)
    {
        //Test, if statistic already exist-->if not, create it
        $sql_query = "SELECT * FROM ".$this->Tables_Statistics." WHERE user_id='".$user_id."' AND statistic_type_id='".$statistic_type_id."'";

        $result =& $this->get_result_from_query_on_database($sql_query);

        $statistic = array();
        if($result->num_rows==0)
        {
            $insert_array = array(
               "statistic_type_id" => $statistic_type_id,
               "user_id" => $user_id,
               "json_statistic" => json_encode(array()),
               "ts_last_update" => "NOW()"
            );

            $this->insert_statistics_data($insert_array);

            $sql_query = "SELECT * FROM ".$this->Tables_Statistics." WHERE user_id='".$user_id."' AND statistic_type_id='".$statistic_type_id."'";

            $result =& $this->get_result_from_query_on_database($sql_query);

            if($result==false) {throw new Exception("ERROR IN ".__FUNCTION__);}

            $statistic = $result->fetch_array(MYSQLI_ASSOC);

            $statistic["json_statistic"] = json_decode($statistic["json_statistic"], true);


            $result->close();
        }
        else
        {
            $statistic = $result->fetch_array(MYSQLI_ASSOC);

            $statistic["json_statistic"] = json_decode($statistic["json_statistic"], true);


            $result->close();
        }

        //Updaten der Statistiken
        if($statistic_type_id==1)
        {
            //data:
            //ts:
            //Completed tasks
            $user_data = $this->get_users_all_details($user_id);

            $statistic["json_statistic"][] = array("data" => $user_data["completed_tasks"], "ts" => time());

        }
        else if($statistic_type_id==2)
        {
            //data:
            //ts:
            //User Score
            $user_data = $this->get_users_all_details($user_id);

            $statistic["json_statistic"][] = array("data" => $user_data["user_score"], "ts" => time());
        }

        //Eintragen in Datenbank
        $statistic["json_statistic"] = json_encode($statistic["json_statistic"]);

        $this->set_statistics_data($statistic, $statistic["statistic_id"]);

        return true;
    }

    public function update_statistics_administration($statistic_type_id)
    {
        //Test, if statistic already exist-->if not, create it
        $statistic = $this->get_statistics_administration_all_details_from_statistic_type_id($statistic_type_id);
        $statistic["json_statistic"] = json_decode($statistic["json_statistic"],true);

        //Updaten der Statistiken
        if($statistic_type_id==1)
        {
            //data:
            //ts:
            //Completed tasks for all user
            $sql_query = "SELECT SUM(completed_tasks) FROM ".$this->Tables_Users;

            $result =& $this->get_result_from_query_on_database($sql_query);

            $row = $result->fetch_array(MYSQLI_ASSOC);


            $result->close();

            $doesEntityExist = false;
            $startTimestampToday = mktime(0,0,1);
            $endTimestampToday = mktime(0,0,0,date("n"),date("j")+1);
            foreach ($statistic["json_statistic"] as $key => $statisticEntityArray)
            {
                if($statisticEntityArray["ts"]>=$startTimestampToday && $statisticEntityArray["ts"]<=$endTimestampToday)
                {
                    $doesEntityExist = true;
                    $statistic["json_statistic"][$key]["data"] = $row["SUM(completed_tasks)"];
                }
            }

            if($doesEntityExist==false)
            {
                $statistic["json_statistic"][] = array("ts" => time(), "data" => $row["SUM(completed_tasks)"]);
            }
        }
        else if($statistic_type_id==2)
        {
            //data:
            //ts:
            //Completed daily tasks for all user
            /*$daily_task_data = $this->get_daily_tasks_all_details_from_today();
            $daily_task_data["json_solved_by_user_ids"] = json_decode($daily_task_data["json_solved_by_user_ids"],true);

            $doesEntityExist = false;
            $startTimestampToday = mktime(0,0,1);
            $endTimestampToday = mktime(0,0,0,date("n"),date("j")+1);
            foreach ($statistic["json_statistic"] as $key => $statisticEntityArray)
            {
                if($statisticEntityArray["ts"]>=$startTimestampToday && $statisticEntityArray["ts"]<=$endTimestampToday)
                {
                    $doesEntityExist = true;
                    $statistic["json_statistic"][$key]["data"] = count($daily_task_data["json_solved_by_user_ids"]);
                }
            }

            if($doesEntityExist==false)
            {
                $statistic["json_statistic"][] = array("ts" => time(), "data" => count($daily_task_data["json_solved_by_user_ids"]));
            }*/
        }

        //Eintragen in Datenbank
        $statistic["json_statistic"] = json_encode($statistic["json_statistic"]);

        $this->set_statistics_administration_data($statistic, $statistic["statistic_id"]);

        return true;
    }

    public function update_faculty_score($faculty_id, $add_score)
    {
        /* OLD WAY:
         * $sql_query=     "CREATE TEMPORARY TABLE tmp ENGINE=INNODB
                        (SELECT u.user_score
                        FROM ".$this->Tables_Users." u
                        WHERE u.faculty_id='".$faculty_id."');";
        $sql_query.=    "UPDATE ".$this->Tables_Faculties." up SET faculty_score=(SELECT SUM(user_score) FROM tmp);";

        $result =& $this->get_result_from_query_on_database($sql_query);*/

        $faculty_data = $this->get_faculties_all_details($faculty_id);

        //Calculate score to add depend on faculties active users
        //$active_users_for_faculty = $this->get_users_count_for_faculty_id_active_last_days($faculty_id, 30);
        $score_for_faculty = $add_score; // ceil(30*$add_score/$active_users_for_faculty)>$add_score? $add_score : ceil(30*$add_score/$active_users_for_faculty);

        $faculty_data["faculty_score"] = $faculty_data["faculty_score"] + $score_for_faculty;

        $set_array = array(
           "faculty_score" => $faculty_data["faculty_score"]
        );

        $this->set_faculties_data($set_array, $faculty_id);

        return $score_for_faculty;
    }

    public function update_user_score($user_id)
    {
        //TASKS
        $sql_query=     "SELECT t.needed_value, uts.value, t.score_rule
                        FROM ".$this->Tables_Users." u, ".$this->Tables_User_Task_Score." uts, ".$this->Tables_Tasks." t
                        WHERE u.user_id='".$user_id."' AND u.user_id=uts.user_id AND uts.task_id=t.task_id AND t.needed_value<=uts.value";
        $result =& $this->get_result_from_query_on_database($sql_query);

        $user_score = 0;
        while($row = $result->fetch_array(MYSQLI_ASSOC))
        {
            $user_score += $row["score_rule"];
        }

        $result->close();

        //QUESTS
        $sql_query=     "SELECT * FROM ".$this->Tables_User_Quest." WHERE user_id='".$user_id."' AND completed='1'";
        $result =& $this->get_result_from_query_on_database($sql_query);

        while($row = $result->fetch_array(MYSQLI_ASSOC))
        {
            $row = array_merge($row, $this->get_quests_all_details($row["quest_id"]));
            $user_score += $row["score_rule"];
        }


        $result->close();

        //Difference old_score-new_score for task
        $user_data = $this->get_users_all_details($user_id);
        $score_diff = $user_score-$user_data["user_score"]>0 ? $user_score-$user_data["user_score"] : 0;

        //Neuen Wert setzen
        $set_array = array(
           "user_id" => $user_id,
           "user_score" => $user_score
        );
        $this->set_users_data($set_array, $user_id);

        return $score_diff;
    }

    public function update_user_badge($user_id, $task_id)
    {
        $all_badges = $this->get_badges_all_all_details();
        $return_new_solved_badge_ids = array();

        if($this->has_user_completed_task($user_id, $task_id))
        {
            foreach ($all_badges as $key => $badgeArray)
            {
                $temp_task_ids = json_decode($badgeArray["json_task_ids"], true);

                if(in_array($task_id, $temp_task_ids))
                {

                    $isBadgeCompletedForUser = true;

                    foreach($temp_task_ids as $key2 => $temp_task_id)
                    {
                        if(!$this->has_user_completed_task($user_id, $temp_task_id))
                        {
                            $isBadgeCompletedForUser = false;
                            break;
                        }
                    }

                    if($isBadgeCompletedForUser)
                    {
                        $sql_query = "SELECT * FROM ".$this->Tables_User_Badge." WHERE user_id='".$user_id."' AND badge_id='".$badgeArray["badge_id"]."'";

                        $result =& $this->get_result_from_query_on_database($sql_query);

                        $set_array;

                        if($result->num_rows!=0)
                        {
                            $set_array = array(
                                "badge_id" => $badgeArray["badge_id"],
                                "user_id" => $user_id,
                                "completed" => 1
                            );

                            $row = $result->fetch_array(MYSQLI_ASSOC);

                            if($row["completed"]==0) $set_array["ts_badge_completed"] = "NOW()";
                        }
                        else
                        {
                            $set_array = array(
                                "badge_id" => $badgeArray["badge_id"],
                                "user_id" => $user_id,
                                "completed" => 1,
                                "ts_badge_completed" => "NOW()"
                            );
                        }

                        if($this->check_if_user_has_completed_badge($user_id, $badgeArray["badge_id"])) continue;
                        if($badgeArray["is_active"]==0) continue;

                        $return_new_solved_badge_ids[] = $badgeArray["badge_id"];

                        $this->set_user_badge_data($set_array, $user_id, $badgeArray["badge_id"]);
                    }

                }
            }

        }

        return $return_new_solved_badge_ids;
    }

    public function update_user_quest($user_id)
    {
        $all_quests = $this->get_quests_all_all_details();
        $return_new_solved_quest_ids = array();

        foreach($all_quests as $key => $questArray)
        {
            $sql_query = "SELECT * FROM ".$this->Tables_User_Quest." WHERE user_id='".$user_id."' AND quest_id='".$questArray["quest_id"]."'";
            $result =& $this->get_result_from_query_on_database($sql_query);
            $user_quest;

            if($result->num_rows==0)
            {

                $result->close();

                //INSERT USER_QUEST
                $insert_array = array(
                   "user_id" => $user_id,
                   "quest_id" => $questArray["quest_id"],
                   "completed" => 0,
                   "ts_quest_completed" => NULL

                );
                $this->insert_user_quest_data($insert_array);

                $user_quest = $insert_array;
            }
            else
            {
                $user_quest = $result->fetch_array(MYSQLI_ASSOC);


                $result->close();
            }

            //Check if quest is completed
            $questArray["json_quest_task_ids"] = json_decode($questArray["json_quest_task_ids"], true);
            $questArray["json_pre_quest_ids"] = json_decode($questArray["json_pre_quest_ids"], true);

            $is_quest_completed = true;
            foreach ($questArray["json_pre_quest_ids"] as $key2 => $preQuestId)
            {
                if(!$this->is_quest_completed_for_user_id($user_id, $preQuestId))
                {
                    $is_quest_completed = false;
                    break;
                }
            }
            if($is_quest_completed==false) continue;
            foreach ($questArray["json_quest_task_ids"] as $key2 => $taskStageArray)
            {
                foreach ($taskStageArray as $key3 => $taskId)
                {
                    if(!$this->has_user_completed_task($user_id, $taskId))
                    {
                        $is_quest_completed = false;
                        break;
                    }
                }
                if(!$is_quest_completed) break;
            }
            if($is_quest_completed==false) continue;
            if($this->is_quest_completed_for_user_id($user_id, $questArray["quest_id"])) continue;
            if($questArray["is_active"]==0) continue;

            //Insert that quest is completed
            $set_array = array(
               "completed" => 1,
               "ts_quest_completed" => "NOW()"
            );
            $this->set_user_quest_data($set_array, $user_id, $questArray["quest_id"]);

            $return_new_solved_quest_ids[] = $questArray["quest_id"];
        }

        return $return_new_solved_quest_ids;
    }

    public function update_completed_tasks($user_id)
    {
        $sql_query=     "SELECT t.needed_value, uts.value, t.score_rule
                        FROM ".$this->Tables_Users." u, ".$this->Tables_User_Task_Score." uts, ".$this->Tables_Tasks." t
                        WHERE u.user_id='".$user_id."' AND u.user_id=uts.user_id AND uts.task_id=t.task_id AND t.needed_value<=uts.value";
        $result =& $this->get_result_from_query_on_database($sql_query);

        $completed_tasks = 0;
        while($row = $result->fetch_array(MYSQLI_ASSOC))
        {
            $completed_tasks += 1;
        }


        $result->close();

        //Neuen Wert setzen
        $set_array = array(
           "user_id" => $user_id,
           "completed_tasks" => $completed_tasks
        );
        $this->set_users_data($set_array, $user_id);

        return true;
    }

    public function update_completed_badges($user_id)
    {
        $sql_query=     "SELECT COUNT(*)
                        FROM ".$this->Tables_User_Badge." ub
                        WHERE ub.user_id='".$user_id."' AND ub.completed=1";
        $result =& $this->get_result_from_query_on_database($sql_query);

        $row = $result->fetch_array(MYSQLI_ASSOC);


        $result->close();

        //Neuen Wert setzen
        $set_array = array(
           "completed_badges" => $row["COUNT(*)"]
        );
        $this->set_users_data($set_array, $user_id);

        return true;
    }

    public function update_completed_quests($user_id)
    {
        $sql_query=     "SELECT COUNT(*)
                        FROM ".$this->Tables_User_Quest." uq
                        WHERE uq.user_id='".$user_id."' AND uq.completed='1'";
        $result =& $this->get_result_from_query_on_database($sql_query);

        $row = $result->fetch_array(MYSQLI_ASSOC);


        $result->close();

        //Neuen Wert setzen
        $set_array = array(
           "completed_quests" => $row["COUNT(*)"]
        );
        $this->set_users_data($set_array, $user_id);

        return true;
    }

    public function update_active_tasks_quests($user_id, $task_array, $quest_array)
    {
        $user_data = $this->get_users_all_details($user_id);
        $user_data["json_active_quest_ids"] = json_decode($user_data["json_active_quest_ids"], true);
        $user_data["json_active_task_ids"] = json_decode($user_data["json_active_task_ids"], true);

        foreach ($user_data["json_active_task_ids"] as $key => $taskIdUserArray)
        {
            foreach ($task_array as $key2 => $toDeleteTaskId)
            {
                if($taskIdUserArray==$toDeleteTaskId)
                {
                    $user_data["json_active_task_ids"][$key] = NULL;
                    unset($user_data["json_active_task_ids"][$key]);
                }

            }
        }

        foreach ($user_data["json_active_quest_ids"] as $key => $questIdUserArray)
        {
            foreach ($quest_array as $key2 => $toDeleteQuestId)
            {
                if($questIdUserArray==$toDeleteQuestId)
                {
                    $user_data["json_active_quest_ids"][$key] = NULL;
                    unset($user_data["json_active_quest_ids"][$key]);
                }

            }
        }

        //Set user_data
        $user_data["json_active_quest_ids"] = json_encode($user_data["json_active_quest_ids"]);
        $user_data["json_active_task_ids"] = json_encode($user_data["json_active_task_ids"]);

        $set_array = array(
           "json_active_quest_ids" => $user_data["json_active_quest_ids"],
           "json_active_task_ids" => $user_data["json_active_task_ids"]
        );

        $this->set_users_data($set_array, $user_id);

        return true;
    }

    public function add_task_progress_to_user($user_id, $task_id, $to_add)
    {
        $sql_query = "SELECT uts.* FROM ".$this->Tables_User_Task_Score." uts WHERE uts.user_id='".$user_id."' AND uts.task_id='".$task_id."'";

        $result =& $this->get_result_from_query_on_database($sql_query);
        $row;

        if($result->num_rows==0)
        {
            $insert_array = array(
               "user_id" => $user_id,
               "task_id" => $task_id,
               "value" => 0,
               "ts_first_update" => "NOW()",
               "ts_last_update" => "NOW()",
               "json_ts_value_update" => json_encode(array())
            );

            $row = $insert_array;

            $this->insert_user_task_score_data($insert_array);
        }
        else
        {
            $row = $result->fetch_array(MYSQLI_ASSOC);
        }

        $result->close();

        //task_data
        $task_data = $this->get_tasks_all_details($task_id);
        $task_score = 0;

        if(($row["value"]+$to_add)>=$task_data["needed_value"])
        {
            $task_score = $task_data["score_rule"];
            $to_add = $task_data["needed_value"] - $row["value"]>=0?$task_data["needed_value"] - $row["value"]:0;
        }


        //Updaten von Value
        $row["json_ts_value_update"] = json_decode($row["json_ts_value_update"], true);
        $row["json_ts_value_update"][] = array("value" => $to_add, "ts" => time());
        $row["json_ts_value_update"] = json_encode($row["json_ts_value_update"]);
        $sql_query="UPDATE ".$this->Tables_User_Task_Score." uts SET uts.value=uts.value+".$to_add.",uts.score=".$task_score.",uts.ts_last_update=NOW(),uts.json_ts_value_update='".$row["json_ts_value_update"]."' WHERE uts.user_id='".$user_id."' AND uts.task_id='".$task_id."';";

        $result =& $this->get_result_from_query_on_database($sql_query);


        //Update der Scores und Statistiken
        $user_data = $this->get_users_all_details($user_id);

        $completed_badge_ids = $this->update_user_badge($user_id, $task_id);
        $completed_quest_ids = $this->update_user_quest($user_id);

        $added_score =              $this->update_user_score($user_id);
        $added_score_for_faculty =  $this->update_faculty_score($user_data["faculty_id"], $added_score);

        $this->update_completed_tasks($user_id);
        $this->update_completed_badges($user_id);
        $this->update_completed_quests($user_id);

        $this->update_statistics_for_user_id($user_id, 1);
        $this->update_statistics_for_user_id($user_id, 2);

        //Update/Delete Active Task/Quest for user
        $completed_task_array = array();
        if($added_score!=0)
            $completed_task_array = array($task_id);
        $this->update_active_tasks_quests($user_id, $completed_task_array, $completed_quest_ids);

        //Update Daily Task
        /*$daily_task_data = $this->get_task_daily_task_with_descriptions_if_user_has_not_completed($user_id, $user_data["language"]);
        if($added_score!=0 && $daily_task_data["task_id"]==$task_id)
        {
            $this->set_daily_tasks_new_solved_user_id($daily_task_data["daily_task_id"], $user_id);
        }*/

        //Update Statistics for Administration
        $this->update_statistics_administration(1);
        $this->update_statistics_administration(2);

        //Build return
        $return_array = array();
        $return_array["tasks"] = array();
        $return_array["added_score_for_faculty"] = 0;
        if($added_score!=0)
        {
            $return_array["tasks"][] = $task_id;
            $return_array["added_score_for_faculty"] = $added_score_for_faculty;
        }
        $return_array["badges"] = $completed_badge_ids;
        $return_array["quests"] = $completed_quest_ids;

        return $return_array;
    }

    public function has_user_completed_task($user_id, $task_id)
    {
        $sql_query=     "SELECT t.needed_value, uts.value
                        FROM ".$this->Tables_User_Task_Score." uts, ".$this->Tables_Tasks." t
                        WHERE uts.user_id='".$user_id."' AND uts.task_id='".$task_id."' AND t.task_id='".$task_id."' AND t.needed_value<=uts.value";
        $result =& $this->get_result_from_query_on_database($sql_query);

        if($result->num_rows==0) return false;
        else return true;
    }

    public function get_users_all_details_after_score($limit)
    {
        $sql_query = "SELECT * FROM ".$this->Tables_Users." ORDER BY user_score DESC LIMIT ".$limit;

        $result =& $this->get_result_from_query_on_database($sql_query);

        $rows = array();
        while($row = $result->fetch_array(MYSQLI_ASSOC))
        {
            $row = array_merge($row, $this->get_faculties_all_details($row["faculty_id"]));
            $rows[] = $row;
        }


        $result->close();

        return $rows;
    }

    public function get_users_all_details_after_score_for_faculty_id($faculty_id, $limit)
    {
        $sql_query = "SELECT * FROM ".$this->Tables_Users." WHERE faculty_id='".$faculty_id."' ORDER BY user_score DESC LIMIT ".$limit;

        $result =& $this->get_result_from_query_on_database($sql_query);

        $rows = array();
        $faculty_data = $this->get_faculties_all_details($faculty_id);
        while($row = $result->fetch_array(MYSQLI_ASSOC))
        {
            $row = array_merge($row, $faculty_data);
            $rows[] = $row;
        }


        $result->close();

        return $rows;
    }

    public function get_user_last_completed_badges_all_details($user_id, $language, $limit)
    {
        $last_badges = $this->get_user_badge_last_completed_badges($user_id, $limit);

        foreach ($last_badges as $key => $userBadgeArray)
        {
            $last_badges[$key] = array_merge($last_badges[$key], $this->get_badges_descriptions_description_only_with_fallback_language($userBadgeArray["badge_id"], $language));
            $last_badges[$key] = array_merge($last_badges[$key], $this->get_badges_all_details($userBadgeArray["badge_id"]));
        }

        return $last_badges;
    }

    public function get_user_last_completed_tasks_all_details($user_id, $language, $limit)
    {
        $last_tasks = $this->get_user_task_score_last_updated_tasks($user_id, $limit);

        foreach ($last_tasks as $key => $userTaskArray)
        {
            $last_tasks[$key] = array_merge($last_tasks[$key], $this->get_tasks_all_details($userTaskArray["task_id"]));

            if($last_tasks[$key]["value"]>=$last_tasks[$key]["needed_value"])
            {
                $last_tasks[$key]["json_ts_value_update"] = json_decode($last_tasks[$key]["json_ts_value_update"], true);

                if(($last_tasks[$key]["value"]%$last_tasks[$key]["needed_value"])-$last_tasks[$key]["json_ts_value_update"][count($last_tasks[$key]["json_ts_value_update"])-1]["value"]<0)
                {
                    $last_tasks[$key] = array_merge($last_tasks[$key], $this->get_tasks_descriptions_description_only_with_fallback_language($userTaskArray["task_id"], $language));
                    $last_tasks[$key] = array_merge($last_tasks[$key], $this->get_tasks_types_all_details($last_tasks[$key]["task_type_id"]));
                }
                else
                {
                    unset($last_tasks[$key]);
                }
            }
            else
            {
                unset($last_tasks[$key]);
            }
        }

        $t_return = array();
        foreach ($last_tasks as $key => $value) {
          $t_return[] = $last_tasks[$key];
        }

        return $t_return;
    }

    public function get_user_last_completed_quests_all_details($user_id, $language, $limit)
    {
        $sql_query = "SELECT * FROM ".$this->Tables_User_Quest." WHERE user_id='".$user_id."' and completed='1' ORDER BY ts_quest_completed DESC LIMIT ".$limit;

        $result =& $this->get_result_from_query_on_database($sql_query);

        $rows = array();
        while($row = $result->fetch_array(MYSQLI_ASSOC))
        {
            $row = array_merge($row, $this->get_quests_all_details($row["quest_id"]));
            $row = array_merge($row, $this->get_quests_descriptions_description_only_with_fallback_language($row["quest_id"], $language));
            $rows[] = $row;
        }


        $result->close();

        return $rows;
    }

    public function get_tasks_sorted_after_type_and_user_task_info_for_user_id($user_id, $language)
    {
        $return_array = $this->get_tasks_types_all_all_details();
        $user_task_details = $this->get_user_task_score_all_task_score_from_user_id($user_id);

        foreach ($return_array as $key => $task_type_array)
        {
            $return_array[$key] = array_merge($return_array[$key], $this->get_tasks_types_descriptions_description_only_with_fallback_language($task_type_array["task_type_id"], $language));
            $return_array[$key]["tasks"] = array();
        }

        foreach ($user_task_details as $key => $userTaskArray)
        {
            $user_task_details[$key] = array_merge($user_task_details[$key], $this->get_tasks_all_details($userTaskArray["task_id"]));
            $user_task_details[$key] = array_merge($user_task_details[$key], $this->get_tasks_descriptions_description_only_with_fallback_language($userTaskArray["task_id"], $language));

            foreach ($return_array as $key2 => $task_type_array)
            {
                if($user_task_details[$key]["task_type_id"]==$return_array[$key2]["task_type_id"])
                {
                    $return_array[$key2]["tasks"][] = $user_task_details[$key];
                    break;
                }
            }
        }

        return $return_array;
    }

    public function get_tasks_completed_tasks_for_user_id($user_id)
    {
        $user_task_score_entrys = $this->get_user_task_score_all_task_score_from_user_id($user_id);

        $returnCompletedTaskArray = array();

        foreach ($user_task_score_entrys as $key => $userTaskScoreArray)
        {
            $task_all_details = $this->get_tasks_all_details($userTaskScoreArray["task_id"]);

            if($userTaskScoreArray["value"]>=$task_all_details["needed_value"])
            {
                $returnCompletedTaskArray[] = $task_all_details["task_id"];
            }
        }

        return $returnCompletedTaskArray;
    }

    public function get_task_all_details_with_descriptions($task_id, $language)
    {
        $task = $this->get_tasks_all_details($task_id);

        $task = array_merge($task, $this->get_tasks_descriptions_description_only_with_fallback_language($task_id, $language));

        return $task;
    }

    /*public function get_task_pre_tasks_description_with_completion_statement($user_id, $task_id, $language)
    {
        $user_data = $this->get_users_all_details($user_id);
        $task_data = $this->get_tasks_all_details($task_id);
        $task_data["pre_tasks"] = json_decode($task_data["pre_tasks"], true);

        foreach ($task_data["pre_tasks"] as $key => $taskId)
        {
            $task_data["pre_tasks"][$key] = array();
            $task_data["pre_tasks"][$key] = array_merge($task_data["pre_tasks"][$key], $this->get_task_all_details_with_descriptions($taskId, $user_data["language"]));
            $task_data["pre_tasks"][$key]["completed"] = $this->has_user_completed_task($user_id, $taskId);
        }

        return $task_data["pre_tasks"];
    }*/

    public function get_quest_pre_quests_description_with_completion_statement($user_id, $quest_id)
    {
        $user_data = $this->get_users_all_details($user_id);
        $quest_data = $this->get_quests_all_details($quest_id);
        $quest_data["json_pre_quest_ids"] = json_decode($quest_data["json_pre_quest_ids"], true);

        foreach ($quest_data["json_pre_quest_ids"] as $key => $questId)
        {
            $quest_data["json_pre_quest_ids"][$key] = array_merge($quest_data["json_pre_quest_ids"][$key], $this->get_quests_all_details($questId));
            $quest_data["json_pre_quest_ids"][$key] = array_merge($quest_data["json_pre_quest_ids"][$key], $this->get_quests_descriptions_description_only_with_fallback_language($questId, $user_data["language"]));
            $quest_data["json_pre_quest_ids"][$key]["completed"] = $this->is_quest_completed_for_user_id($user_id, $questId);
        }

        return $quest_data["json_pre_quest_ids"];
    }

    public function get_users_sorted_after_user_score_with_faculty($low, $high)
    {
        $sql_query=     "CREATE TEMPORARY TABLE tmp ENGINE=INNODB
                        (SELECT user_id, user_score,
                         CASE user_score
                            WHEN @prevRank THEN @curRank
                            WHEN @prevRank := user_score THEN @curRank := @curRank +1
                         END AS ranking
                         FROM ".$this->Tables_Users.",
                         (SELECT @curRank := 0, @prevRank := NULL) r
                         ORDER BY user_score DESC);";
        $result =& $this->get_result_from_query_on_database($sql_query);

        $sql_query = " SELECT u.*,t.ranking FROM ".$this->Tables_Users." u, tmp t WHERE u.user_id=t.user_id ORDER BY t.ranking ASC LIMIT ".$low.",".($high-$low).";";

        $result =& $this->get_result_from_query_on_database($sql_query);

        $rows = array();
        while($row = $result->fetch_array(MYSQLI_ASSOC))
        {
            $row = array_merge($row, $this->get_faculties_all_details($row["faculty_id"]));
            $rows[] = $row;
        }


        $result->close();

        return $rows;
    }

    public function get_users_sorted_after_user_score()
    {
        $sql_query=     "CREATE TEMPORARY TABLE tmp ENGINE=INNODB
                        (SELECT u.user_id, u.username, u.user_score, f.facultyname,
                         CASE u.user_score
                            WHEN @prevRank THEN @curRank
                            WHEN @prevRank := u.user_score THEN @curRank := @curRank +1
                         END AS ranking
                         FROM ".$this->Tables_Users." u
                         LEFT JOIN ".$this->Tables_Faculties." f ON f.faculty_id=u.faculty_id,
                         (SELECT @curRank := 0, @prevRank := NULL) r
                         ORDER BY u.user_score DESC)";
        $result =& $this->get_result_from_query_on_database($sql_query);

        $sql_query = " SELECT t.* FROM tmp t ORDER BY t.ranking ASC";

        $result =& $this->get_result_from_query_on_database($sql_query);

        $rows = array();
        while($row = $result->fetch_array(MYSQLI_ASSOC))
        {
            $rows[] = $row;
        }

        $result->close();

        return $rows;
    }

    public function get_quest_all_details_with_descriptions($quest_id, $language)
    {
        $quest = $this->get_quests_all_details($quest_id);

        $quest = array_merge($quest, $this->get_quests_descriptions_description_only_with_fallback_language($quest_id, $language));

        return $quest;
    }

    public function get_badge_all_details_with_descriptions($badge_id, $language)
    {
        $badge = $this->get_badges_all_details($badge_id);

        $badge = array_merge($badge, $this->get_badges_descriptions_description_only_with_fallback_language($badge_id, $language));

        return $badge;
    }

    public function get_badge_tasks_description_with_completion_statement($user_id, $badge_id, $language)
    {
        $user_data = $this->get_users_all_details($user_id);
        $badge_data = $this->get_badges_all_details($badge_id);
        $badge_data["json_task_ids"] = json_decode($badge_data["json_task_ids"], true);

        foreach ($badge_data["json_task_ids"] as $key => $taskId)
        {
            $badge_data["json_task_ids"][$key] = array();
            $badge_data["json_task_ids"][$key] = array_merge($badge_data["json_task_ids"][$key], $this->get_task_all_details_with_descriptions($taskId, $user_data["language"]));
            $badge_data["json_task_ids"][$key]["completed"] = $this->has_user_completed_task($user_id, $taskId);
        }

        return $badge_data["json_task_ids"];
    }

    public function get_tasks_types_all_task_types_with_description($language)
    {
        $sql_query = "SELECT * FROM ".$this->Tables_Tasks_Types;

        $result =& $this->get_result_from_query_on_database($sql_query);

        $rows = array();

        while($row = $result->fetch_array(MYSQLI_ASSOC))
        {
            $row = array_merge($row, $this->get_tasks_types_descriptions_description_only_with_fallback_language($row["task_type_id"], $language));
            $rows[] = $row;
        }


        $result->close();

        return $rows;
    }

    public function check_if_task_exist_by_taskname($taskname)
    {
        $sql_query = "SELECT * FROM ".$this->Tables_Tasks_Descriptions." WHERE taskname='".$taskname."'";

        $result =& $this->get_result_from_query_on_database($sql_query);

        if($result->num_rows==0) return false;
        else return true;
    }

    public function check_if_badge_exist_by_badgename($badgename)
    {
        $sql_query = "SELECT * FROM ".$this->Tables_Badges_Descriptions." WHERE badgename='".$badgename."'";

        $result =& $this->get_result_from_query_on_database($sql_query);

        if($result->num_rows==0) return false;
        else return true;
    }

    public function delete_overall_user($user_id)
    {
        $user_data = $this->get_users_all_details($user_id);
        if($user_data["user_type_id"]==2) return false;

        //$this->Tables_Users
        $this->delete_users($user_id);

        //$this->Tables_User_Badge
        $this->delete_user_badge_all_entity_containing_user_id($user_id);

        //$this->Tables_User_Quest
        $this->delete_user_quest_all_entity_containing_user_id($user_id);

        //$this->Tables_User_Task_Score
        $this->delete_user_task_all_entity_containing_user_id($user_id);

        return true;
    }

    public function delete_overall_task($task_id)
    {
        //$this->Tables_Tasks
        $this->delete_tasks($task_id);

        //$this->Tables_Tasks_Descriptions
        $this->delete_tasks_descriptions_all_entity_containing_task_id($task_id);

        //$this->Tables_User_Task_Score
        $this->delete_user_task_all_entity_containing_task_id($task_id);

        //$this->Tables_Users
        $this->delete_users_task_id_from_json_active_task_ids($task_id);

        //$this->Tables_Quests
        $this->delete_quests_task_id_from_json_quest_task_ids($task_id);

        //$this->Tables_Badges
        $this->delete_badges_task_id_from_json_task_ids($task_id);
    }

    public function delete_overall_badge($badge_id)
    {
        //$this->Tables_Tasks
        $this->delete_badges($badge_id);

        //$this->Tables_Tasks_Descriptions
        $this->delete_badges_descriptions_all_entity_containing_badge_id($badge_id);

        //$this->Tables_User_Badge
        $this->delete_user_badge_all_entity_containing_badge_id($badge_id);
    }

    public function delete_overall_quest($quest_id)
    {
        //$this->Tables_Quests
        $this->delete_quests($quest_id);
        $this->delete_quests_quest_id_from_json_pre_quest_ids($quest_id);

        //$this->Tables_Quests_Descriptions
        $this->delete_quests_descriptions_all_entity_containing_quest_id($quest_id);

        //$this->Tables_User_Quest
        $this->delete_user_quest_all_entity_containing_quest_id($quest_id);

        //$this->Tables_Users
        $this->delete_users_quest_id_from_json_active_quest_ids($quest_id);
    }

    public function delete_overall_location($location_id)
    {
        //_LOCATIONS
        $this->delete_locations($location_id);

        //_LOCATIONS_DESCRIPTIONS
        $this->delete_locations_descriptions($location_id, "en_US");
        $this->delete_locations_descriptions($location_id, "de_DE");

        //_TASKS
        $tasks_for_location = $this->get_tasks_for_location($location_id);
        foreach ($tasks_for_location as $key => $taskArray)
        {
            $set_array = array("location_id" => NULL);
            $this->set_tasks_data($set_array, $taskArray["task_id"]);
        }

        //_QUESTS
        $quests_for_location = $this->get_quests_for_location($location_id);
        foreach ($quests_for_location as $key => $questArray)
        {
            $set_array = array("location_id" => NULL);
            $this->set_tasks_data($set_array, $questArray["quest_id"]);
        }
    }

    public function get_tasks_all_details_active_tasks_for_user_id($user_id, $language)
    {
        $t_return = array();
        $user_data = $this->get_users_all_details($user_id);
        $return_json_active_task_ids = json_decode($user_data["json_active_task_ids"], true);

        foreach ($return_json_active_task_ids as $key => $task_id)
        {
            //$return_json_active_task_ids[$key] = $this->get_task_all_details_with_descriptions($task_id, $language);
            $t_return[] = $this->get_task_all_details_with_descriptions($task_id, $language);
        }

        return $t_return;
    }

    public function get_quests_all_details_active_starter_quests_for_user_id($user_id, $language)
    {
        $user_data = $this->get_users_all_details($user_id);
        $return_json_active_quest_ids = json_decode($user_data["json_active_quest_ids"], true);

        foreach ($return_json_active_quest_ids as $key => $quest_id)
        {
            $return_json_active_quest_ids[$key] = $this->get_quests_all_details($quest_id);
            $return_json_active_quest_ids[$key] = array_merge($return_json_active_quest_ids[$key], $this->get_quests_descriptions_description_only_with_fallback_language($quest_id, $language));

            if($return_json_active_quest_ids[$key]["is_starter_quest"]==1)
            {
                $return_json_active_quest_ids[$key]["json_quest_task_ids"] = json_decode($return_json_active_quest_ids[$key]["json_quest_task_ids"], true);

                foreach ($return_json_active_quest_ids[$key]["json_quest_task_ids"] as $step => $taskIdArray)
                {
                    $return_json_active_quest_ids[$key]["json_quest_task_ids"]["completed"] = true;
                    foreach ($return_json_active_quest_ids[$key]["json_quest_task_ids"][$step] as $key2 => $task_id)
                    {
                        $task_completed_true_false = $this->get_task_completed_true_false_statement($user_id, $task_id);
                        $task_description_data = $this->get_tasks_descriptions_description_only_with_fallback_language($task_id, $language);
                        $return_json_active_quest_ids[$key]["json_quest_task_ids"][$step][$key2] = array("task_id" => $task_id, "completed" => $task_completed_true_false, "taskname" => $task_description_data["taskname"]);
                        if($task_completed_true_false==false) $return_json_active_quest_ids[$key]["json_quest_task_ids"]["completed"] = false;
                    }
                }
            }
            else
            {
                unset($return_json_active_quest_ids[$key]);
            }
        }

        return $return_json_active_quest_ids;
    }

    public function get_quests_all_details_active_quests_for_user_id($user_id, $language)
    {
        $returnArray = array();
        $user_data = $this->get_users_all_details($user_id);
        $return_json_active_quest_ids = json_decode($user_data["json_active_quest_ids"], true);

        foreach ($return_json_active_quest_ids as $key => $quest_id)
        {
            $return_json_active_quest_ids[$key] = $this->get_quests_all_details($quest_id);
            $return_json_active_quest_ids[$key] = array_merge($return_json_active_quest_ids[$key], $this->get_quests_descriptions_description_only_with_fallback_language($quest_id, $language));
            $return_json_active_quest_ids[$key]["json_quest_task_ids"] = json_decode($return_json_active_quest_ids[$key]["json_quest_task_ids"], true);

            foreach ($return_json_active_quest_ids[$key]["json_quest_task_ids"] as $step => $taskIdArray)
            {
                $stepCompleted = true;
                foreach ($return_json_active_quest_ids[$key]["json_quest_task_ids"][$step] as $key2 => $task_id)
                {
                    $task_completed_true_false = $this->get_task_completed_true_false_statement($user_id, $task_id);
                    $task_description_data = $this->get_tasks_descriptions_description_only_with_fallback_language($task_id, $language);
                    $return_json_active_quest_ids[$key]["json_quest_task_ids"][$step][$key2] = array("task_id" => $task_id, "completed" => $task_completed_true_false, "taskname" => $task_description_data["taskname"]);
                    if($task_completed_true_false==false) $stepCompleted = false;
                }
            }

            $returnArray[] = $return_json_active_quest_ids[$key];
        }

        return $returnArray;
    }

    public function get_active_task_ids_for_active_quests_for_user_id($user_id)
    {
        $returnArray = array();
        $user_data = $this->get_users_all_details($user_id);
        $return_json_active_quest_ids = json_decode($user_data["json_active_quest_ids"], true);

        foreach ($return_json_active_quest_ids as $key => $quest_id)
        {
            $t_quest_data = $this->get_quests_all_details($quest_id);
            $t_quest_data["json_quest_task_ids"] = json_decode($t_quest_data["json_quest_task_ids"], true);

            $step_not_fully_completed = -1;
            foreach ($t_quest_data["json_quest_task_ids"] as $step => $taskIdArray)
            {
                $stepCompleted = true;
                foreach ($taskIdArray as $key2 => $task_id)
                {
                    if(false == $this->get_task_completed_true_false_statement($user_id, $task_id))
                    {
                      $stepCompleted = false;
                      break;
                    }
                }

                if($stepCompleted == false)
                {
                  $step_not_fully_completed = $step;
                  break;
                }
            }

            if($step_not_fully_completed != -1)
            {
              foreach ($t_quest_data["json_quest_task_ids"][$step_not_fully_completed] as $key2 => $task_id)
              {
                if(!in_array($task_id,$returnArray))
                {
                  $returnArray[] = $task_id;
                }
              }
            }

        }

        return $returnArray;
    }

    public function get_quests_progress_for_quest_id_user_id($user_id, $quest_id, $language)
    {
        $user_data = $this->get_users_all_details($user_id);
        $return_quest_array = $this->get_quests_all_details($quest_id);
        $return_quest_array = array_merge($return_quest_array, $this->get_quests_descriptions_description_only_with_fallback_language($quest_id, $language));

        $return_quest_array["json_quest_task_ids"] = json_decode($return_quest_array["json_quest_task_ids"], true);

        foreach ($return_quest_array["json_quest_task_ids"] as $step => $taskIdArray)
        {
            $stepCompleted = true;
            foreach ($return_quest_array["json_quest_task_ids"][$step] as $key2 => $task_id)
            {
                $task_completed_true_false = $this->get_task_completed_true_false_statement($user_id, $task_id);
                $task_description_data = $this->get_tasks_descriptions_description_only_with_fallback_language($task_id, $language);
                $return_quest_array["json_quest_task_ids"][$step][$key2] = array("task_id" => $task_id, "completed" => $task_completed_true_false, "taskname" => $task_description_data["taskname"]);
                if($task_completed_true_false==false) $stepCompleted = false;
            }
            $return_quest_array["json_quest_task_ids"][$step]["completed"] = $stepCompleted;
        }


        return $return_quest_array["json_quest_task_ids"];
    }

    public function get_task_completed_true_false_statement($user_id, $task_id)
    {
        $user_task_score = $this->get_user_task_score_all_details($user_id, $task_id);
        $task_data = $this->get_tasks_all_details($task_id);

        if($user_task_score["value"]>=$task_data["needed_value"]) return true;
        else return false;
    }

    /*public function get_task_daily_task_with_descriptions_if_user_has_not_completed($user_id, $language)
    {
        $daily_task = $this->get_daily_tasks_all_details_from_today();
        if(count($daily_task)==0) return array();
        $daily_task = array_merge($daily_task, $this->get_tasks_all_details($daily_task["task_id"]));
        $daily_task = array_merge($daily_task, $this->get_tasks_descriptions_description_only_with_fallback_language($daily_task["task_id"], $language));

        $daily_task["json_solved_by_user_ids"] = json_decode($daily_task["json_solved_by_user_ids"], true);

        foreach ($daily_task["json_solved_by_user_ids"] as $key => $solved_user_id)
        {
            if($user_id==$solved_user_id) return array();
        }

        return $daily_task;
    }*/

    public function check_for_new_tasks_with_location($user_id, $geo_lati, $geo_long)
    {
        $user_data = $this->get_users_all_details($user_id);
        $user_data["json_active_task_ids"] = json_decode($user_data["json_active_task_ids"], true);
        $all_locations = $this->get_locations_all_all_details();

        $returnNewTasks = array();

        foreach ($all_locations as $key => $locationArray)
        {
            if($this->is_lati_long_within_location(
                $geo_lati,
                $geo_long,
                $locationArray["geo_lati"],
                $locationArray["geo_long"],
                $locationArray["geo_radius"]))
            {
                //Position of person is within location
                $tasksForLocation = $this->get_tasks_for_location($locationArray["location_id"]);

                //check if user already has found the task

                foreach($tasksForLocation as $key => $taskArray)
                {
                    if($taskArray["is_task_active"]==1 && !in_array($taskArray["task_id"], $user_data["json_active_task_ids"]))
                    {
                        //check if task is already solved by user
                        if($this->has_user_completed_task($user_id, $taskArray["task_id"])) continue;

                        $user_data["json_active_task_ids"][] = $taskArray["task_id"];
                        $returnNewTasks[] = $taskArray;
                    }
                }

            }
        }

        //save user_data
        $user_data["json_active_task_ids"] = json_encode($user_data["json_active_task_ids"]);
        $this->set_users_data(array("json_active_task_ids" => $user_data["json_active_task_ids"]), $user_id);

        return $returnNewTasks;
    }

    public function check_for_new_quests_with_location($user_id, $geo_lati, $geo_long)
    {
        $user_data = $this->get_users_all_details($user_id);
        $user_data["json_active_quest_ids"] = json_decode($user_data["json_active_quest_ids"], true);
        $all_locations = $this->get_locations_all_all_details();

        $returnNewQuests = array();

        foreach ($all_locations as $key => $locationArray)
        {
            if($this->is_lati_long_within_location($geo_lati, $geo_long, $locationArray["geo_lati"], $locationArray["geo_long"], $locationArray["geo_radius"]))
            {
                //Position of person is within location
                $questsForLocation = $this->get_quests_for_location($locationArray["location_id"]);

                //check if user already has found the quest

                foreach($questsForLocation as $key => $questArray)
                {
                    if($questArray["is_active"]==1 && !in_array($questArray["quest_id"], $user_data["json_active_quest_ids"]))
                    {
                        //check if quest is already solved by user
                        if($this->is_quest_completed_for_user_id($user_id, $questArray["quest_id"])) continue;

                        //check quest dependencies
                        $pre_quests_are_completed = true;
                        foreach (json_decode($questArray["json_pre_quest_ids"], true) as $key => $pre_quest_id)
                        {
                            if(!$this->is_quest_completed_for_user_id($user_id, $pre_quest_id))
                                $pre_quests_are_completed = false;
                        }

                        if($pre_quests_are_completed)
                        {
                            $user_data["json_active_quest_ids"][] = $questArray["quest_id"];
                            $returnNewQuests[] = $questArray;
                        }
                    }
                }

            }
        }

        //save user_data
        $user_data["json_active_quest_ids"] = json_encode($user_data["json_active_quest_ids"]);
        $this->set_users_data(array("json_active_quest_ids" => $user_data["json_active_quest_ids"]), $user_id);

        return $returnNewQuests;
    }

    public function check_for_user_tasks_to_solve_with_location($user_id, $geo_lati, $geo_long)
    {
        $user_data = $this->get_users_all_details($user_id);
        $user_data["json_active_task_ids"] = json_decode($user_data["json_active_task_ids"], true);
        $all_locations = $this->get_locations_all_all_details();

        $all_user_tasks = $user_data["json_active_task_ids"];
        $t_tasks_from_quests = $this->get_active_task_ids_for_active_quests_for_user_id($user_id);
        foreach($t_tasks_from_quests as $key => $task_id)
        {
          if(!in_array($task_id,$all_user_tasks))
          {
            $all_user_tasks[] = $task_id;
          }
        }

        $returnTasksWithinLocation = array();

        foreach ($all_locations as $key => $locationArray)
        {
            if($this->is_lati_long_within_location($geo_lati, $geo_long, $locationArray["geo_lati"], $locationArray["geo_long"], $locationArray["geo_radius"]))
            {
                //Position of person is within location

                foreach ($all_user_tasks as $key => $task_id)
                {
                    $task_Array = $this->get_tasks_all_details($task_id);
                    $task_Array["json_task_data"] = json_decode($task_Array["json_task_data"], true);

                    if($task_Array["is_task_active"]==0) continue;

                    if($task_Array["task_type_id"]==2 && isset($task_Array["json_task_data"]["loc"]) && $task_Array["json_task_data"]["loc"].""=="".$locationArray["location_id"])
                        $returnTasksWithinLocation[] = $task_Array;
                }
            }
        }

        return $returnTasksWithinLocation;
    }



    public function get_tasks_all_task_data_with_all_descriptions()
    {
        $sql_query = "SELECT * FROM ".$this->Tables_Tasks;

        $result =& $this->get_result_from_query_on_database($sql_query);

        $rows = array();

        while($row = $result->fetch_array(MYSQLI_ASSOC))
        {
            $row["de_DE"] = $this->get_tasks_descriptions_all_details($row["task_id"], "de_DE");
            $row["en_US"] = $this->get_tasks_descriptions_all_details($row["task_id"], "en_US");
            $rows[] = $row;
        }


        $result->close();

        return $rows;
    }

    public function get_badges_all_badge_data_with_all_descriptions()
    {
        $sql_query = "SELECT * FROM ".$this->Tables_Badges;

        $result =& $this->get_result_from_query_on_database($sql_query);

        $rows = array();

        while($row = $result->fetch_array(MYSQLI_ASSOC))
        {
            $row["de_DE"] = $this->get_badges_descriptions_all_details($row["badge_id"], "de_DE");
            $row["en_US"] = $this->get_badges_descriptions_all_details($row["badge_id"], "en_US");
            $rows[] = $row;
        }


        $result->close();

        return $rows;
    }

    public function get_users_count_completed_all_badges()
    {
        $count_all_badges = $this->get_badges_count();

        $sql_query = "SELECT COUNT(*) FROM ".$this->Tables_Users." WHERE completed_badges='".$count_all_badges."'";

        $result =& $this->get_result_from_query_on_database($sql_query);

        $row = $result->fetch_array(MYSQLI_ASSOC);


        $result->close();

        return $row["COUNT(*)"];
    }

    public function get_users_count_completed_all_quests()
    {
        $count_all_quests = $this->get_quests_count();

        $sql_query = "SELECT COUNT(*) FROM ".$this->Tables_Users." WHERE completed_quests='".$count_all_quests."'";

        $result =& $this->get_result_from_query_on_database($sql_query);

        $row = $result->fetch_array(MYSQLI_ASSOC);

        $result->close();

        return $row["COUNT(*)"];
    }

    public function create_new_anonymous_user()
    {
        //update anonymous users
        if(rand(0, 10)<=5)
        {
            $this->update_users_delete_all_inactive_anonymous_user();
        }

        //HOECHSTE ID aus $USER_PRIVATE["USER"] erfragen
        $new_user_id = 1;
        if(!$this->get_next_free_id($new_user_id, $this->Tables_Users, "user_id"))
        {
            throw new Exception("ERROR IN ".__FUNCTION__."");
        }

        //Checke solange nach neuen Usernamen, bis einer gefunden wurde, der nicht existiert
        $username_found = false;
        $username = "";
        for ($i = 0; $i < 10000000; $i++)
        {
            $username = self::$Anonymous_User_Phrase.$i;
            if(!$this->check_if_username_exists($username))
            {
                $username_found = true;
                break;
            }
        }

        if($username_found==false)
        {
            throw new Exception("ERROR IN ".__FUNCTION__."; No new Username found!");
        }


        //$this->Tables_User einfuegen
        $pwt_addition = substr(md5(rand()), 0, 10);
        $insert_array = array(
            "user_id" => $new_user_id,
            "username" => $username,
            "email" => "",
            "pwd_addition" => $pwt_addition,
            "pwd_login" => "",
            "user_type_id" => 0,
            "language" => "de_DE",
            "user_score" => 0,
            "completed_tasks" => 0,
            "completed_badges" => 0,
            "json_active_quest_ids" => json_encode($this->get_quests_ids_array_of_all_starter_quests()),
            "json_active_task_ids" => json_encode(array()),
            "ts_active" => "NOW()",
            "ts_registration" => "NOW()",
            "faculty_id" => -2,
            "is_user_active" => 1);
        $this->insert_users_data($insert_array);

        return $username;
    }

    public function update_users_delete_all_inactive_anonymous_user()
    {
        $all_anonymous_users = $this->get_users_all_users_containing_username(self::$Anonymous_User_Phrase);

        foreach ($all_anonymous_users as $key => $userArray)
        {
            $userArray = array("username" => $userArray);
            $userArray = array_merge($userArray, $this->get_users_all_details($this->get_users_user_id($userArray["username"])));
            if(strtotime($userArray["ts_active"])+60*60*24*self::$Anonymous_User_Inactive_Days_to_Delete_User<time())
            {
                $this->delete_overall_user($userArray["user_id"]);
            }
        }

        return true;
    }

    public function login_anonymous_user($username)
    {
        //user_id erhalten, gleichzeitig auch testen, ob User vorhanden
        $user_id = $this->get_users_user_id(stripslashes($username));

        $set_array = array("ts_active" => "NOW()");

        if (!$this->set_users_data($set_array, $user_id))
        {
            throw new Exception("ERROR");
        }

        //insert _User_Session
        $insert_array = array(
           "user_id" => $user_id,
           "json_data" => json_encode(array("ts" => time(), "agent" => md5($_SERVER["HTTP_USER_AGENT"]))),
           "ts" => "NOW()"
        );

        $session_hash_id = $this->insert_user_session_data($insert_array);

        //set Cookie
        setcookie($this->NAME_OF_USER_COOKIE, $session_hash_id, time()+60*60*24*365, "/");


        return true;
    }

    public function send_new_password_and_username_to_user($email)
    {
        $sql_query = "SELECT * FROM ".$this->Tables_Users." WHERE email='".$email."'";

        $result =& $this->get_result_from_query_on_database($sql_query);

        if($result->num_rows!=0)
        {
            $row = $result->fetch_array(MYSQLI_ASSOC);


            $result->close();

            //Neues Passwort
            $new_password = substr(md5(time()), 0, 10);
            $pwt_addition = $row["pwd_addition"];

            $set_array = array(
                "pwd_login" => md5($new_password . $pwt_addition)
            );

            $this->set_users_data($set_array, $row["user_id"]);

            //Sende Mail
            $temp_message = "Hey ".$row["username"].",<br/>deine neuen Zugangsdaten:<br/>Username: ".$row["username"]."<br/>Passwort: ".$new_password;
            $temp_headline = "New Password for ".$row["username"];

            $header = "From: ". JKF_Const::getFromINI("EMAIL_WHERE_ADMIN_MAILS_COME_FROM") ." \r\n" . "Content-type: text/html; charset=iso-8859-1 \r\n";

            mail($row["email"], $temp_headline, $temp_message, $header);

            return true;
        }
        else
        {
            return false;
        }
    }

    public function get_locations_with_description_where_user_id_can_find_tasks($user_id, $language)
    {
        $user_data = $this->get_users_all_details($user_id);
        $user_data["json_active_task_ids"] = json_decode($user_data["json_active_task_ids"],true);
        $user_data["json_active_quest_ids"] = json_decode($user_data["json_active_quest_ids"],true);
        $locations_data = $this->get_locations_all_all_details();
        $return_location_with_tasks_or_quests_to_find_array = array();

        foreach ($locations_data as $key => $locationArray)
        {
            $locationTasks = $this->get_tasks_for_location($locationArray["location_id"]);
            $has_location_new_tasks_to_find = false;

            foreach ($locationTasks as $key2 => $locationTaskArray)
            {
                if($this->has_user_completed_task($user_id, $locationTaskArray["task_id"])) continue;

                if(!in_array($locationTaskArray["task_id"], $user_data["json_active_task_ids"]))
                {
                    $has_location_new_tasks_to_find = true;
                    break;
                }

            }


            $locationQuests = $this->get_quests_for_location($locationArray["location_id"]);

            foreach ($locationQuests as $key2 => $locationQuestArray)
            {
                $userQuestData = $this->get_user_quest_all_details($user_id, $locationQuestArray["quest_id"]);
                if($userQuestData["completed"]==1) continue;
                $locationQuestArray["json_pre_quest_ids"] = json_decode($locationQuestArray["json_pre_quest_ids"],true);

                $has_user_completed_all_pre_quests = true;
                foreach ($locationQuestArray["json_pre_quest_ids"] as $key3 => $locationQuestPreQuestArray)
                {
                    $userQuestData = $this->get_user_quest_all_details($user_id, $locationQuestArray["quest_id"]);
                    if($userQuestData["completed"]==0)
                    {
                        $has_user_completed_all_pre_quests = false;
                        break;
                    }
                }

                if($has_user_completed_all_pre_quests == true && !in_array($locationQuestArray["quest_id"], $user_data["json_active_quest_ids"]))
                {
                    $has_location_new_tasks_to_find = true;
                    break;
                }

            }

            if($has_location_new_tasks_to_find == true)
            {
                $return_location_with_tasks_or_quests_to_find_array[] = array_merge($locationArray,$this->get_locations_descriptions_description_only_with_fallback_language($locationArray["location_id"], $language));
            }

        }

        return $return_location_with_tasks_or_quests_to_find_array;
    }

    public function set_quest_active_for_all_users($quest_id)
    {
        $sql_query = "SELECT user_id,json_active_quest_ids FROM ".$this->Tables_Users;

        $result =& $this->get_result_from_query_on_database($sql_query);

        while($row = $result->fetch_array(MYSQLI_ASSOC))
        {
            $row["json_active_quest_ids"] = json_decode($row["json_active_quest_ids"],true);
            $row["json_active_quest_ids"][] = $quest_id;
            $row["json_active_quest_ids"] = json_encode($row["json_active_quest_ids"]);

            $set_array = array(
               "json_active_quest_ids" => $row["json_active_quest_ids"]
            );

            $this->set_users_data($set_array, $row["user_id"]);
        }


        $result->close();

        return true;
    }

    public function get_task_data_from_next_task_in_quest_for_user_id($user_id, $task_id, $language)
    {
        $quests_containing_task_id = $this->get_quests_all_details_from_quest_containing_task_id($task_id);
        $return_task_data = array();

        $next_task_ids = array();

        foreach ($quests_containing_task_id as $quest_key => $quest_array)
        {
            $user_quest_progress = $this->get_quests_progress_for_quest_id_user_id($user_id, $quest_array["quest_id"], $language);

            foreach ($user_quest_progress as $step => $user_quest_progress_step)
            {
                if(!is_numeric($step))
                    continue;

                foreach ($user_quest_progress_step as $task_key => $task_progress_array)
                {
                    if(!is_numeric($task_key))
                        continue;

                    if($task_progress_array["task_id"] == $task_id)
                    {
                        if(isset($user_quest_progress[$step+1]) && $user_quest_progress[$step]["completed"] == true && $user_quest_progress[$step+1]["completed"] == false)
                        {
                            if(count($user_quest_progress[$step+1])>1)
                                $next_task_ids[] = array("quality" => 1,"task_id" => $user_quest_progress[$step+1][0]["task_id"], "quest_id" => $quest_array["quest_id"], "questname" => $quest_array["questname"]);
                        }
                        else if(isset($user_quest_progress[$step+1]) && $user_quest_progress[$step]["completed"] == true && $user_quest_progress[$step+1]["completed"] == true)
                        {
                            if(count($user_quest_progress[$step+1])>1)
                                $next_task_ids[] = array("quality" => 3,"task_id" => $user_quest_progress[$step+1][0]["task_id"], "quest_id" => $quest_array["quest_id"], "questname" => $quest_array["questname"]);
                        }
                        else if($user_quest_progress[$step]["completed"] == false)
                        {
                            foreach ($user_quest_progress_step as $task_key2 => $task_progress_array2)
                            {
                                if(!is_numeric($task_key2))
                                    continue;

                                if($task_progress_array2["task_id"] != $task_id)
                                {
                                    $next_task_ids[] = array("quality" => 2,"task_id" => $task_progress_array2["task_id"], "quest_id" => $quest_array["quest_id"], "questname" => $quest_array["questname"]);
                                }
                            }
                        }
                    }

                }
            }

        }

        //Quality 1
        foreach ($next_task_ids as $key => $next_task_ids_array)
        {
            if($next_task_ids[$key]["quality"] == 1)
            {
                $return_task_data["questname"] = $next_task_ids[$key]["questname"];
                $return_task_data["task_data"] = $this->get_task_all_details_with_descriptions($next_task_ids[$key]["task_id"], $language);
                return $return_task_data;
            }
        }

        //Quality 2
        foreach ($next_task_ids as $key => $next_task_ids_array)
        {
            if($next_task_ids[$key]["quality"] == 2)
            {
                $return_task_data["questname"] = $next_task_ids[$key]["questname"];
                $return_task_data["task_data"] = $this->get_task_all_details_with_descriptions($next_task_ids[$key]["task_id"], $language);
                return $return_task_data;
            }
        }

        //Quality 3
        foreach ($next_task_ids as $key => $next_task_ids_array)
        {
            if($next_task_ids[$key]["quality"] == 3)
            {
                $return_task_data["questname"] = $next_task_ids[$key]["questname"];
                $return_task_data["task_data"] = $this->get_task_all_details_with_descriptions($next_task_ids[$key]["task_id"], $language);
                return $return_task_data;
            }
        }

        return $return_task_data;
    }





    //private Funktionen
    //private function is_lati_long_within_location($lati, $long, $location_lati, $location_long, $location_radius)
    //private function validation_check_for_username($username)
    //private function validation_check_for_taskname($taskname)
    //private function validation_check_for_badgename($badgename)
    //private function validation_check_for_questname($questname)
    //public function is_username_a_anonymous_username($username)
    //public function validation_check_pw($password)
    //private function validation_check_for_session_hash_id($session_hash_id)

    private function is_lati_long_within_location($lati, $long, $location_lati, $location_long, $location_radius)
    {
        $location_max_lati = $location_lati + ($location_radius/1.1132)*0.000011;
        $location_min_lati = $location_lati - ($location_radius/1.1132)*0.000011;
        $location_max_long = $location_long + ($location_radius/1.1132)*0.000011;
        $location_min_long = $location_long - ($location_radius/1.1132)*0.000011;

        if($lati>=$location_min_lati && $lati<=$location_max_lati && $long>=$location_min_long && $long<=$location_max_long)
            return true;
        else return false;
    }

    private function validation_check_for_username($username)
    {
        foreach ($this->NotAllowedCharacters as $key => $notAllowedCharacter)
        {
            if (strpos($username,$notAllowedCharacter) !== false)
            {
                return false;
            }
        }

        if(strlen($username)<2)
        {
            return false;
        }

        if (strpos($username,self::$Anonymous_User_Phrase) !== false)
        {
            return false;
        }


        return true;
    }

    private function validation_check_for_taskname($taskname)
    {
        foreach ($this->NotAllowedCharacters as $key => $notAllowedCharacter)
        {
            if (strpos($taskname,$notAllowedCharacter) !== false)
            {
                return false;
            }
        }

        return true;
    }

    private function validation_check_for_badgename($badgename)
    {
        foreach ($this->NotAllowedCharacters as $key => $notAllowedCharacter)
        {
            if (strpos($badgename,$notAllowedCharacter) !== false)
            {
                return false;
            }
        }

        return true;
    }

    private function validation_check_for_questname($questname)
    {
        foreach ($this->NotAllowedCharacters as $key => $notAllowedCharacter)
        {
            if (strpos($questname,$notAllowedCharacter) !== false)
            {
                return false;
            }
        }

        return true;
    }

    public function is_username_a_anonymous_username($username)
    {
        if (strpos($username,self::$Anonymous_User_Phrase) !== false)
        {
            return true;
        }

        return false;
    }

    public function validation_check_pw($password)
    {
        return preg_match("/[A-Za-z0-9!?.:;-]{6,}/", $password);
    }

    private function validation_check_for_session_hash_id($session_hash_id)
    {
        $notAllowedSessionCharacters = array("\"", "'", ";", ".", "ä", "ü", "ö", "+", "-", "--", "---", "\\", "(", ")", "]", "[");

        foreach ($notAllowedSessionCharacters as $key => $notAllowedCharacter)
        {
            if (strpos($session_hash_id,$notAllowedCharacter) !== false)
            {
                return false;
            }
        }

        if(strlen($session_hash_id) != 40)
        {
            return false;
        }

        return true;
    }

    //
    //Join Function
    //
    protected function get_string_of_join_sql_values($array)
    {
      $return_string = "";
      foreach ($array as $key => $value) {
        if(is_string($value) && $value == "NOW()") $return_string .= "NOW(),";
        else $return_string .= "'$value',";
      }
      $return_string = substr($return_string, 0, -1);

      return $return_string;
    }

    protected function get_string_of_update_sql_values($array)
    {
      $return_string = "";
      foreach ($array as $key => $value) {
        if(is_string($value) && $value == "NOW()") $return_string .= $key."=NOW(),";
        else $return_string .= $key."='$value',";
      }
      $return_string = substr($return_string, 0, -1);

      return $return_string;
    }
}

?>
