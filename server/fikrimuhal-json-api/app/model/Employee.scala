package model

/**
 * Created by oguzhan on 8/21/14.
 */
case class Employee(id: Int, name: String, photo: String)

object Employee {
  import play.api.libs.json._
  implicit val jsonConverter = Json.format[Employee]

  val all = Seq(
    Employee(1, "M. Oğuzhan Ataman", "photourl"),
    Employee(2, "Kasım Süzen", "photourl")
  )

  def filterById(id: Int) = all.filter(id == _.id)
  def get(id: Int) : Option[Employee] = all.find(id == _.id)
}