package model

/**
 * Created by oguzhan on 8/21/14.
 */


case class Customer(id: Int, name: String, photo: String)

object Customer {

  import play.api.libs.json._

  implicit val jsonConverter = Json.format[Customer]

  val products = model.Product.all
  val all = Seq(
    Customer(1, "Ahmet", "photourl"),
    Customer(2, "Mehmet", "photourl"),
    Customer(2, "Mehmet", "photourl"),
    Customer(2, "Mehmet", "photourl"),
    Customer(2, "Mehmet", "photourl"),
    Customer(2, "Mehmet", "photourl"),
    Customer(2, "Mehmet", "photourl"),
    Customer(2, "Mehmet", "photourl"),
    Customer(2, "Mehmet", "photourl"),
    Customer(2, "Mehmet", "photourl"),
    Customer(2, "Mehmet", "photourl"),
    Customer(2, "Mehmet", "photourl"),
    Customer(2, "Mehmet", "photourl"),
    Customer(2, "Mehmet", "photourl"),
    Customer(2, "Mehmet", "photourl"),
    Customer(2, "Mehmet", "photourl"),
    Customer(2, "Mehmet", "photourl"),
    Customer(2, "Mehmet", "photourl"),
    Customer(3, "Hilmi", "photourl")
  )

  def get(id: Int): Option[Customer] = all.find(id == _.id)
}