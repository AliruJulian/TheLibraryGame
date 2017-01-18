<?php

require_once("./JKF_Const.php");


class JKF_Model
{
	private $host;
  private $database_name;
  private $database_user;
  private $database_password;
  private $connection;

  public $NAME_OF_USER_COOKIE;

	public function __construct()
	{
		$this->host = JKF_Const::getFromINI("DATABASE_HOST");
    $this->database_name = JKF_Const::getFromINI("DATABASE_NAME");
		$this->database_user = JKF_Const::getFromINI("DATABASE_USER");
    $this->database_password = JKF_Const::getFromINI("DATABASE_PASSWORD");

    $this->NAME_OF_USER_COOKIE = JKF_Const::getFromINI("NAME_OF_USER_COOKIE");

	}



//
//
//
//
//
	public function check_if_entity_exists($t_table, $t_colnames, $t_identifier_for_request)
	{
		if(!$this->connect_to_database())
		{
			throw new Exception("DB-Connection ERROR: ". __CLASS__);
		}

		$sql_query="SELECT ";

		if($t_colnames[0] == '*')
		{
				$sql_query .= " * ";
		}
		else
		{
			foreach($t_colnames as $key => $colname)
			{
				$sql_query .= " '$colname' ,";
			}
			$sql_query = substr($sql_query, 0, -2);
		}

		$sql_query .= " FROM $t_table";
		if(isset($t_identifier_for_request))
		{
			$sql_query .= " WHERE";
			foreach($t_identifier_for_request as $identifier_name => $identifier_value)
			{
				$sql_query .= " $identifier_name='$identifier_value' AND";
			}
			$sql_query = substr($sql_query, 0, -4);
		}

		$result = $this->connection->query( $sql_query );
		if($result->num_rows==0) {return false;}
		else {return true;}
	}


      public function get_next_free_id(&$returnNextId, $tablename, $colIdName)
      {
            if(!$this->connect_to_database())
        		{
        		    throw new Exception("DB-Connection ERROR: ". __CLASS__);
        		}

            $sql_query = "SELECT $colIdName + 1 FROM $tablename WHERE $colIdName + 1 NOT IN (SELECT $colIdName FROM $tablename)";


				    $result = $this->connection->query( $sql_query );
						if($result == false || $result->num_rows==0) {$returnNextId=1; return true;}

						$row = $result->fetch_array(MYSQLI_ASSOC);
						$returnNextId = $row["$colIdName + 1"];

            return true;
      }


        public function run_query_on_database($database, $sql_query)
        {
            if(!$this->connect_to_database())
            {
                throw new Exception("DB-Connection ERROR: ". __CLASS__);
            }

            $this->connection->query($sql_query);

            return true;
        }

        public function &get_result_from_prepared_statement_query_on_database($database, $prepared_statement, $statement_types, $statement_params)
        {
            if(!$this->connect_to_database())
            {
                throw new Exception("DB-Connection ERROR: ". __CLASS__);
            }

            if($stmt = $this->connection->prepare($prepared_statement))
            {

                if (!call_user_func_array(array($stmt, "bind_param"), array_merge(array($statement_types), $statement_params))) {
                    throw new Exception("BINING PARAMETER FAILED: ".$stmt->error." [[Error Number: ".$stmt->errno."]] --- PREPARED STATEMENT: [ ".$prepared_statement." ] --- TYPES: [ ".$statement_types." ] --- PARAMS:  ".json_encode($statement_params)." ");
                }

                if(!$stmt->execute())
                {
                    throw new Exception("ERROR IN GET PREPARED STATEMENT: ".$stmt->error." [[Error Number: ".$stmt->errno."]] --- PREPARED STATEMENT: [ ".$prepared_statement." ] --- TYPES: [ ".$statement_types." ] --- PARAMS:  ".json_encode($statement_params)." ");
                }

                return $stmt->get_result();
            }
            else
            {
                throw new Exception("ERROR PREPARED STATEMENT: ".__FUNCTION__);
            }


        }

        public function &get_mysqli_connection_to_database()
        {
            if(!$this->connect_to_database())
            {
                throw new Exception("DB-Connection ERROR: ". __CLASS__);
            }

            return $this->connection;
        }

        public function &get_result_from_query_on_database($sql_query)
        {
            if(!$this->connect_to_database())
            {
                throw new Exception("DB-Connection ERROR: ". __CLASS__);
            }

            $result = $this->connection->query($sql_query);

            if($result==false)
                throw new Exception("ERROR IN ".__FUNCTION__." --- QUERY: [ ".$sql_query." ] --- WITH CODE: ".$this->connection->error);

            return $result;
        }

	public function &getConnection()
	{
		if(!$this->connect_to_database())
		{
				throw new Exception("DB-Connection ERROR: ". __CLASS__);
		}

		return $this->connection;
	}

	//
	//private function connect_to_database()
	//
	private function connect_to_database($db_host = null, $db_name = null)
	{

		if($db_name == null)
		{
			if($this->connection == null || !($this->connection->ping()))
			{
				$this->connection = @new mysqli($this->host, $this->database_user, $this->database_password, $this->database_name);

				if(mysqli_connect_errno($this->connection))
				{
	          throw new Exception("DB-Connection ERROR: " . mysqli_connect_error());
				}

	      //Set encoding
	      if(!mysqli_set_charset($this->connection, "utf8"))
	      {
	          throw new Exception("ERROR SETTING CHARSET TO UTF8: " . $this->connection->error);
	      }
			}
		}

		return true;
	}



}
?>
