package controllers

import model.Employee
import play.api.libs.json._
import play.api.mvc.{Action, Controller}
import play.api.{Logger, Play}

import scala.reflect.io.File

/**
 * Created by oguzhan on 8/20/14.
 */

object EmployeeController extends Controller {


  def list() = Action { request =>
//    val employeesAsMap = Map("employees" -> Employee.all)
//    val employeesJson = Json.toJson(employeesAsMap)
//
//    Logger.debug(Json.prettyPrint(employeesJson))
//    Ok(employeesJson)

    val host = request.headers.get("host").get

    val employeeAsMap = Map("employees" -> Employee.all.map { employee =>
      val host = Play.current.configuration.getString("server.host").getOrElse("localhost")
      val fullUrl = s"http://${host}:9000/api/employees/${employee.id}/photo"
      employee.copy(photoUrl = fullUrl)
    })
    val employeeAsJson = Json.toJson(employeeAsMap)
    Ok(employeeAsJson)
  }

  def get(id: Int) = Action { request =>
    val host = Play.current.configuration.getString("server.host").getOrElse("localhost")
    val employee = Employee.get(id).map { employee =>
      val fullUrl = s"http://${host}:9000/api/employees/${employee.id}/photo"
      employee.copy(photoUrl = fullUrl)
    }
    val employeeJson = Json.toJson(employee)
    Ok(employeeJson)
    //    Employee.get(id).map { e =>
    //      val empJson = Json.toJson(e)
    //      Ok(empJson)
    //    }.getOrElse(NotFound)
  }

  def getEmployeePhoto(id: Int) = Action {
    Employee.get(id).map { employee =>
      val imageBytes = File(employee.photoUrl).toByteArray()
      Ok(imageBytes).withHeaders(
        "content-type" -> "image/jpeg",
        "cache-control" -> s"public, max-age=${7 * 24 * 60 * 60}"
      )
    }.getOrElse(NotFound)
  }
}
