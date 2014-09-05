package model

import org.apache.commons.codec.binary.Base64
import play.api.Logger

import scala.reflect.io.File

/**
 * Created by oguzhan on 8/21/14.
 */


case class Customer(id: Int, name: String, photoData: String, checkinTime: Long, employeeId: Int)

object Customer {

  import play.api.libs.json._

  implicit val jsonConverter = Json.format[Customer]

  val products = model.Product.all

  def profilePicPath(customerId: Int) = "public/data/profilePictures/" + customerId + ".jpg"

  val all = Seq(
    Customer(1, "Eyüphan Akgün",    profilePicPath(1), 1409061949, 1),
    Customer(2, "Anıl Çalışkol",    profilePicPath(2), 1409061949, 1),
    Customer(3, "Sezer Ural",       profilePicPath(3), 1409061949, 1),
    Customer(4, "Mehmet Satılmış",  profilePicPath(4), 1409061949, 1),
    Customer(5, "Kasım Özev",       profilePicPath(5), 1409061949, 1),
    Customer(6, "Emirhan Sarıyar",  profilePicPath(6), 1409061949, 1),
    Customer(7, "Suat Ağgez",       profilePicPath(7), 1409061949, 1),
    Customer(8, "Furkan Tektaş",    profilePicPath(8), 1409061949, 1),
    Customer(9, "Eyüphan Akgün",    profilePicPath(1), 1409061949, 1),
    Customer(12, "Anıl Mavi Çalışkol",    profilePicPath(2), 1409061949, 1),
    Customer(13, "Sezer Mavi Ural",       profilePicPath(3), 1409061949, 1),
    Customer(14, "Mehmet Mavi Satılmış",  profilePicPath(4), 1409061949, 1),
    Customer(15, "Kasım Mavi Özev",       profilePicPath(5), 1409061949, 1),
    Customer(16, "Emirhan Mavi Sarıyar",  profilePicPath(6), 1409061949, 1),
    Customer(17, "Suat Mavi Ağgez",       profilePicPath(7), 1409061949, 1),
    Customer(18, "Furkan Mavi Tektaş",    profilePicPath(8), 1409061949, 1)
    //    Customer(9, "Mehmet", photoData, 1409061949, 1),
    //    Customer(10, "Mehmet", photoData, 1409061949, 1),
    //    Customer(11, "Mehmet", photoData, 1409061949, 1),
    //    Customer(12, "Mehmet", photoData, 1409061949, 1),
    //    Customer(13, "Mehmet", photoData, 1409061949, 1),
    //    Customer(14, "Mehmet", photoData, 1409061949, 1),
    //    Customer(15, "Mehmet", photoData, 1409061949, 1),
    //    Customer(16, "Mehmet", photoData, 1409061949, 1),
    //    Customer(17, "Mehmet", photoData, 1409061949, 1),
    //    Customer(18, "Mehmet", photoData, 1409061949, 1),
    //    Customer(19, "Hilmi", photoData, 1409061949, 1)
  )

  def get(id: Int): Option[Customer] = all.find(id == _.id)
}