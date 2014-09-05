package model

/**
 * Created by oguzhan on 8/21/14.
 */
case class Product(id: Int, name: String, price: BigDecimal, popularity: Int, photo: String)

object Product {

  import play.api.libs.json._

  implicit val jsonConverter = Json.format[Product]

  val all = Seq(
    Product(1, "Kırmızı tişört", 35.99, 1, "./img/products/t-shirt.jpg"),
    Product(2, "Kot pantolon", 95.00, 2, "./img/products/kot.jpg"),
    Product(3, "Gömlek", 10.50, 3, "./img/products/shirt.jpg"),
    Product(4, "Atkı", 20.00, 4, "./img/products/atki.jpg")
  )

  def get(id: Int) = Product.all.find(_.id == id)

  /**
   * Sort data by popularity in ascending order
   * @param limit how many items will be shown
   * @return
   */
  def takeMostPopular(limit: Int) = all.sortBy(-_.popularity).take(limit)
}


