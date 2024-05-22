import errorImage from '../media/errorimg.png';

function NotFound() {
  return (
    <section className="not-found">
      <img src={errorImage} alt='not-found-img' class="not-found-img" />
      <div className="page-not-found">
        <h1 className="not-found-title">Page not found</h1>
        <p>Sorry, we couldn't find the page you were looking for. 
           We suggest that you return to home page.
        </p>
        <button className="not-found-btn">Go to Homepage</button>
      </div>
    </section>
  )
}

export default NotFound;