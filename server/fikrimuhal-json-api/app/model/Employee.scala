package model

/**
 * Created by oguzhan on 8/21/14.
 */
case class Employee(id: Int, name: String, photoUrl: String, passwordHash: String)

object Employee {

  import play.api.libs.json._

  implicit val jsonConverter = Json.format[Employee]

  def employeePicPath(employeeId: Int) = "public/data/employeePictures/" + employeeId + ".jpg"

  val all = Seq(
    Employee(1, "M. Oğuzhan Ataman", employeePicPath(1), "81dc9bdb52d04dc20036dbd8313ed055"),
    Employee(2, "Kasım Süzen", employeePicPath(2), "81dc9bdb52d04dc20036dbd8313ed055"),
    Employee(3, "Ilgaz Şumnulu", employeePicPath(3), "81dc9bdb52d04dc20036dbd8313ed055"),
    Employee(4, "Şükrü Hasdemir",  employeePicPath(4), "81dc9bdb52d04dc20036dbd8313ed055"),
    Employee(5, "Orhan Gencebay",  employeePicPath(5), "81dc9bdb52d04dc20036dbd8313ed055"),
    Employee(6, "Zeki Müren",  employeePicPath(6), "81dc9bdb52d04dc20036dbd8313ed055"),
    Employee(7, "Hakkı Bulut", employeePicPath(7), "81dc9bdb52d04dc20036dbd8313ed055")
  )

  def filterById(id: Int) = all.filter(id == _.id)

  def get(id: Int): Option[Employee] = all.find(id == _.id)
}