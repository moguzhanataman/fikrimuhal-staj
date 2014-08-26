package controllers

import model.Employee
import play.api.Logger
import play.api.libs.json._
import play.api.mvc.{Action, Controller}

/**
 * Created by oguzhan on 8/20/14.
 */

object EmployeeController extends Controller {


  def list() = Action {
    val employeesAsMap = Map("employees" -> Employee.all)
    val employeesJson = Json.toJson(employeesAsMap)

    Logger.debug(Json.prettyPrint(employeesJson))
    Ok(employeesJson)
  }

  def get(id: Int) = Action {
    Employee.get(id).map { e =>
      val empJson = Json.toJson(e)
      Ok(empJson)
    }.getOrElse(NotFound)
  }
}
