package model

/**
 * Created by oguzhan on 8/21/14.
 */
case class Product(id: Int, name: String, price: BigDecimal, popularity: Int, photo: String)

object Product {

  import play.api.libs.json._

  implicit val jsonConverter = Json.format[Product]

  def productPicPath(productId: Int, productCategory: String = "") = "public/data/productPictures/" + "/" + productCategory + "/" + productId + ".jpeg"


  val all = Seq(
    Product(11, "NORTH COAST", 135.99, 1, productPicPath(11, "jeans")),
    Product(12, "M&S COLLECTION", 335.99, 1, productPicPath(12, "jeans")),
    Product(13, "Water Resistant Jeans with Comfort Stretch", 354, 1, productPicPath(13, "jeans")),
    Product(14, "Basic Wash Jeans", 12, 1, productPicPath(14, "jeans")),
    Product(15, "Big & Tall Denim Jeans with Comfort Stretch", 321, 1, productPicPath(15, "jeans")),
    Product(16, "Tapered Leg Denim Jeans with ", 34, 1, productPicPath(16, "jeans")),
    Product(17, "Smart Jeans with StayNEW", 222, 1, productPicPath(17, "jeans")),
    Product(18, "Tapered Jeans with Comfort Stretch", 443, 1, productPicPath(18, "jeans")),
    Product(19, "Jeans with Comfort Stretch", 999, 1, productPicPath(19, "jeans")),
    Product(20, "Rinse Washed Stretch Denim Jeans", 735.99, 1, productPicPath(20, "jeans")),
    Product(21, "Water Resistant Jeans with Comfort Stretch", 22.99, 1, productPicPath(21, "jeans")),
    Product(1, "Kırmızı tişört", 35.99, 1, productPicPath(1)),
    Product(2, "Kot pantolon", 95.00, 2, productPicPath(2)),
    Product(3, "Gömlek", 10.50, 3, productPicPath(3)),
    Product(4, "Atkı", 20.00, 4, productPicPath(4))
  )

  def get(id: Int) = Product.all.find(_.id == id)

  /**
   * Sort data by popularity in ascending order
   * @param limit how many items will be shown
   * @return
   */
  def takeMostPopular(limit: Int) = all.sortBy(-_.popularity).take(limit)
}


