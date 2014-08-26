package model

/**
 * Created by oguzhan on 8/21/14.
 */
case class Employee(id: Int, name: String, photoData: String, hash: String)

object Employee {

  import play.api.libs.json._

  implicit val jsonConverter = Json.format[Employee]

  val all = Seq(
    Employee(1, "M. Oğuzhan Ataman", "photourl", "hash"),
    Employee(2, "Kasım Süzen", "photourl", "hash")
  )

  def filterById(id: Int) = all.filter(id == _.id)

  def get(id: Int): Option[Employee] = all.find(id == _.id)
}