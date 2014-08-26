package model

/**
 * Created by oguzhan on 8/21/14.
 */


case class Customer(id: Int, name: String, photoData: String, checkinTime: Long, employeeId: Int)

object Customer {

  import play.api.libs.json._

  implicit val jsonConverter = Json.format[Customer]

  val products = model.Product.all
  val photoData = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAAEsCAMAAABOo35HAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyRpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpCNUY2RkEwRjUzOEQxMUUzQjRFOUM5RDg4RkJDMzY5RCIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpCNUY2RkExMDUzOEQxMUUzQjRFOUM5RDg4RkJDMzY5RCI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkI1RjZGQTBENTM4RDExRTNCNEU5QzlEODhGQkMzNjlEIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkI1RjZGQTBFNTM4RDExRTNCNEU5QzlEODhGQkMzNjlEIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+GDptigAAAGZQTFRF2NjYt7e319fXzc3N09PT1dXVwcHBz8/Purq60dHR0tLSuLi4vr6+zs7Ou7u71NTU1tbWubm5vLy8w8PDxMTEx8fHyMjIwMDA0NDQxsbGvb29v7+/wsLCysrKy8vLzMzMxcXFycnJ4aC45wAABgdJREFUeNrsnWeW2zoMRg1KsqpVXGTL3fvfZN558yfJTBIyMQEB+u4S7qEoNJKrFQAAAAAAAAAAAAAAAIAZkeavaztcnmNepg46fu3p8WzoB7ZTnsHLJ7J8X9CXtPukg5/vqei3FLukgqQPXFLQHxmmEqb8VH18ka8UqgI4J1AVQFNBVQBTD1X+FDlUBXDsoMqf+raYXCj/R1X/p0ILCbtyegu7JeSNZf0eWTTYD7rSgd5GYzykz1p6JwfLG31/pvfS2l1c7kjvpt5YlXWlCEw2P8WJonCxGETcKRKFvVLEhqJRWwu53haMfsne1MZVDRSVxlCZqysoMkc7AdaWonNApSEAK+HpkUNWbSOC6IiF1kR0+uKRRY2BAMIVTLJor1/WidjQH8pf+WS12j/EjBjR3oF9cMo6K5fVcsoi3Q3FktWV8hzxziuLVLcw9syyVMdaZ2ZZteKkpyduRgQOAUMQPb7CBeQ8Fb8remqVdRCQ1WitzgwCsmql2XROEiiNS68isnSWHjIRV3RTKWsjI2unUlYiI2sLWQE4yDL+O5SStYEs47/DUUiWyomanZAsldXSrZCstcY0WsiVyrpDJyWrVSjrJCWrRuRgO4SXk5VBlj8dZPlTQZY/J8gyXViWk5VAlumyg5ysA2SZLjvIyTpClumyg5ysFrJMlx3kZCksOwjKyiDLcpt1IydL36mUUk6Wvkw6lZOlr4Gfycl6qZPl5GQpPJQiJ0vh9J+grC1k+TNCluVAa5Db4PUlh1sxWQqHji5isu76ZF3FZClsHD7Rv/dnFJOlcIzmhkqpPw0aFt6IzZTSRZ+sh5isPb5Cy+Usua+QJnyFlgs0cl+hwglcQVfqGhZOUpa2qnImKWvAz9Bu/z4VlaVsXrkSlaWsoFWKylLWsDhhz/InF5Wl7OK/DUIHfxJJWdpaYaKf4QMRvOHuTiu4ZalrWOyxZanY4fUdzpRLDjXe3C02cXTV50puLkTh4XuxGF7jvT1Mr899RuelrlkhIqtTKUsm5VH7mswkIEvtE1iOfwb3rPdxNfbI9KL5kWTmF53Wuh/tY52VVP9UOeMmP67Uw3YRroWHt90RQYM/PdOoVroyYatmkeVMyOKZAtzacMXzR1wbkZUgcPCHZaQmMSKL5QHN0oisFUcZsLMia83QALPiiuOc5tmMLIYC886MrBSRQ0AyHT/hqczIiv9G8tqOq/gDSIYWVvSEx9LCit4Us7SwYh8iMLWwVpGv8amMyUqxsObxQ6zMycpqLCx/7lhYAeFDgYXlT6Qp08SkrEgtsY1NWXEaF7lNWXGuETnZdBXnGpESspYdOUSTldqUFed4awdZ/mSQtbi5rJ+Jc/XRCrIW2LdnKAAWkLW88UgWWY1RWVES6QtkLb32F0nWzqisKJ3WJ2Qt63zTV0QZAByNyorSsbhDFkKHOFNaCWT5M9gsaB0w1S3tymIzzMU7WV5YK5ZGPSltLDA9xb2K01I7LIt9uYOdY06rJP5liWbOsXK8N9oa2eMZTmaamdJiuhXKRN+C7TELAzNtfFdK6u/yOMbHpNUPtR34XGlv86Rr4mSdQtUCdAmo0qpLSJVCXe4kp0qXri6RNaVGlyvHLc2DmevKNruaZsR8dVW3M82OOerq831B82RmutLHhebMei4ZoztNLc2e88bNIES4khKGsUOIEMC1RIgQ0tFI2F9sqO4NaaWeUoQIARxzphDhSBZo733s/VxDiOD9NT7jHarO9IQI/o2gGKGXvhDBl+KVvTtEGMgwuxIhAnMi1OfPgpbBcPiXRMhVRkIE/7LE303vZvmhoQUSmgj9t6B2BS2WgESoWuaC+jkR8tnsyyNMfYRetz+FXjkW1Xfsf58IQVBAIgQ9n77GxEFWQCjxq9UFNV+xzSErJG3MIStkqz9BVgCXCrJCwvoUsgK4ppAVEtV3kBXAlEGWP/Uhg6wAXWMPWf4MNwdZARk2ZAUAWZAFWZAFWZAFIAuyIAuyIAuyAGRBFmRBFmRBFoAsyIIsyIIsyAKQBVmQBVmQBVkAsiALsiALsiALQBZkQRZkaeKbAAMATYHHIolXuO0AAAAASUVORK5CYII="
  val all = Seq(
    Customer(1, "Ahmet", photoData, 1409061949, 1),
    Customer(2, "Mehmet", photoData, 1409061949, 1),
    Customer(2, "Mehmet", photoData, 1409061949, 1),
    Customer(2, "Mehmet", photoData, 1409061949, 1),
    Customer(2, "Mehmet", photoData, 1409061949, 1),
    Customer(2, "Mehmet", photoData, 1409061949, 1),
    Customer(2, "Mehmet", photoData, 1409061949, 1),
    Customer(2, "Mehmet", photoData, 1409061949, 1),
    Customer(2, "Mehmet", photoData, 1409061949, 1),
    Customer(2, "Mehmet", photoData, 1409061949, 1),
    Customer(2, "Mehmet", photoData, 1409061949, 1),
    Customer(2, "Mehmet", photoData, 1409061949, 1),
    Customer(2, "Mehmet", photoData, 1409061949, 1),
    Customer(2, "Mehmet", photoData, 1409061949, 1),
    Customer(2, "Mehmet", photoData, 1409061949, 1),
    Customer(2, "Mehmet", photoData, 1409061949, 1),
    Customer(2, "Mehmet", photoData, 1409061949, 1),
    Customer(2, "Mehmet", photoData, 1409061949, 1),
    Customer(3, "Hilmi", photoData, 1409061949, 1)
  )

  def get(id: Int): Option[Customer] = all.find(id == _.id)
}