<?php


class JKF_Const
{

      private static $_config = NULL;
      private static $_filepath = NULL; 

      public static function getFromINI($iniKey)
      {

        if (self::$_config === NULL){

            foreach (glob(__DIR__."/*.ini") as $filename) {
                self::$_filepath = $filename;
            }

            if (!file_exists(self::$_filepath)){
                throw new Exception('Configuration file not found');
            }else{
                self::$_config = parse_ini_file(self::$_filepath);
            }
        }

        if (isset(self::$_config[$iniKey])){
            return self::$_config[$iniKey];
        }else{
            throw new Exception('Variable ' . $iniKey . ' does not exist in configuration file');
        }
     }

}


?>
