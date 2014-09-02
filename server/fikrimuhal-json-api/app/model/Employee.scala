package model

/**
 * Created by oguzhan on 8/21/14.
 */
case class Employee(id: Int, name: String, photoUrl: String, passwordHash: String)

object Employee {

  import play.api.libs.json._

  implicit val jsonConverter = Json.format[Employee]

  val all = Seq(

    Employee(1, "M. Oğuzhan Ataman", "./img/oguz.jpg", "2468"),
    Employee(2, "Kasım Süzen", "./img/kasim.jpg", "2468"),
    Employee(3, "Ilgaz Şumnulu", "./img/ilgaz.jpg", "2468"),
    Employee(4, "Şükrü Hasdemir", "./img/sukru.jpg", "2468"),
    Employee(5, "Orhan Gencebay", "./img/orhan.jpg", "2468"),
    Employee(6, "Zeki Müren", "./img/zeki.jpg", "2468"),
    Employee(7, "Hakkı Bulut", "./img/hakki.jpg", "2468")
  )

  def filterById(id: Int) = all.filter(id == _.id)

  def get(id: Int): Option[Employee] = all.find(id == _.id)
}