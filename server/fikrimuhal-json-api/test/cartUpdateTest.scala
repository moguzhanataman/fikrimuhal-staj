import play.api.test.{Helpers, FakeApplication, FakeHeaders, FakeRequest}
import org.specs2.mutable._
import org.specs2.runner._
import org.junit.runner._

import play.api.test._
import play.api.test.Helpers._

/**
 * Created by oguzhan on 9/10/14.
 */
@RunWith(classOf[JUnitRunner])
class cartUpdateTest extends Specification{
  "POST createGroup with JSON" should {
    "create a group and return a message" in {
      implicit val app = FakeApplication()
      running(app) {
        val fakeRequest = FakeRequest(POST, controllers.routes.CartController.updateCart(5).url, FakeHeaders(), """ {"id": 1, "cid": 2, "itemList": [{"p": 1, "q": 4}, {"p": 2, "q": 2}, {"p": 3, "q": 3}]} """)

        val result = controllers.CartController.updateCart(1)(fakeRequest).result .value.get

        status(result) must equalTo(OK)
        contentType(result) must beSome(AcceptExtractors.Accepts.Json.mimeType)

        val message = Region.parseJson(contentAsString(result))

        // test the message response
      }
    }
  }
}
