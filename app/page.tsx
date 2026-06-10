
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="wrapper">
      <Header />
      <section className="homepage-banner">
        <div className="owl-carousel owl-theme homepage-banner-carousel">
          <div className="item">
            <div className="banner-section">
              <div className="image-area">
                <img src="/assets/images/banner1.jpg" alt="" />
              </div>
              <div className="container-fluid">
                <div className="banner-area">
                  <h2>Experience the Power & Passion of FLAG FOOTBALL</h2>
                  <h5>The only League Spanning Coast to Coast.</h5>
                  <a href="#" className="btn btn-primary">National Tournaments</a>
                </div>
              </div>
            </div>
          </div>
          <div className="item">
            <div className="banner-section">
              <div className="image-area">
                <img src="/assets/images/banner1.jpg" alt="" />
              </div>
              <div className="container-fluid">
                <div className="banner-area">
                  <h2>Experience the Power & Passion of FLAG FOOTBALL</h2>
                  <h5>The only League Spanning Coast to Coast.</h5>
                  <a href="#" className="btn btn-primary">National Tournaments</a>
                </div>
              </div>
            </div>
          </div>
          <div className="item">
            <div className="banner-section">
              <div className="image-area">
                <img src="/assets/images/banner1.jpg" alt="" />
              </div>
              <div className="container-fluid">
                <div className="banner-area">
                  <h2>Experience the Power & Passion of FLAG FOOTBALL</h2>
                  <h5>The only League Spanning Coast to Coast.</h5>
                  <a href="#" className="btn btn-primary">National Tournaments</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


        <section className="success-section section-padding">
            <div className="container">
                <div className="text-center">
                    <h2>Success in Numbers</h2>
                </div>
                
                <div className="row gy-4">
                    <div className="col-6 col-xl-3">
                        <div className="counter-area">
                            <h3>18+</h3>
                            <p>YEARS OF EXPERIENCE</p>
                        </div>
                    </div>
                    <div className="col-6 col-xl-3">
                        <div className="counter-area">
                            <h3>58+</h3>
                            <p>Seasons</p>
                        </div>
                    </div>
                    <div className="col-6 col-xl-3">
                        <div className="counter-area">
                            <h3>1000+</h3>
                            <p>Games Played</p>
                        </div>
                    </div>
                    <div className="col-6 col-xl-3">
                        <div className="counter-area">
                            <h3>800+</h3>
                            <p>All -time Players</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>




        <section className="upcoming-match-section">
            <div className="nav-area">
                <div className="container">
                    <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                        <li className="nav-item" role="presentation">
                            <button className="nav-link active" id="pills-upcoming-tab" data-bs-toggle="pill" data-bs-target="#pills-upcoming" type="button" role="tab" aria-controls="pills-upcoming" aria-selected="true">Upcoming Games</button>
                        </li>
                        <li className="nav-item" role="presentation">
                            <button className="nav-link" id="pills-previous-tab" data-bs-toggle="pill" data-bs-target="#pills-previous" type="button" role="tab" aria-controls="pills-previous" aria-selected="false">Previous Games</button>
                        </li>
                        <li className="nav-item" role="presentation">
                            <button className="nav-link" id="pills-recent-tab" data-bs-toggle="pill" data-bs-target="#pills-recent" type="button" role="tab" aria-controls="pills-recent" aria-selected="false">Recent Results</button>
                        </li>
                    </ul>
                </div>
            </div>
            

            <div className="container match-carousel-main">


                <div className="tab-content" id="pills-tabContent">
                    <div className="tab-pane fade show active" id="pills-upcoming" role="tabpanel" aria-labelledby="pills-upcoming-tab">
                        <div className="owl-carousel owl-theme match-carousel">
                            <div className="item match-area">
                                <h4>sat 15 nov</h4>
                                <div className="middle-area">
                                    <div className="a">
                                        <span><img src="/assets/images/team1.png" alt="Team 1" /></span>
                                        <h6>Cake Walk F25</h6>
                                    </div>
                                    <div className="b"><span>vs</span></div>
                                    <div className="c">
                                        <img src="/assets/images/team2.png" alt="Team 2" />
                                        <h6>Code Yellow F25</h6>
                                    </div>
                                </div>
                                <div className="time"><i className="fa-solid fa-clock"></i><span>7 pm - 9 pm</span></div>
                                <a href="#" className="btn"><i className="fa-solid fa-location-dot"></i> california san diego</a>
                            </div>
                            <div className="item match-area">
                                <h4>sat 15 nov</h4>
                                <div className="middle-area">
                                    <div className="a">
                                        <span><img src="/assets/images/team1.png" alt="Team 1" /></span>
                                        <h6>Cake Walk F25</h6>
                                    </div>
                                    <div className="b"><span>vs</span></div>
                                    <div className="c">
                                        <img src="/assets/images/team2.png" alt="Team 2" />
                                        <h6>Code Yellow F25</h6>
                                    </div>
                                </div>
                                <div className="time"><i className="fa-solid fa-clock"></i><span>7 pm - 9 pm</span></div>
                                <a href="#" className="btn"><i className="fa-solid fa-location-dot"></i> california san diego</a>
                            </div>
                            <div className="item match-area">
                                <h4>sat 15 nov</h4>
                                <div className="middle-area">
                                    <div className="a">
                                        <span><img src="/assets/images/team1.png" alt="Team 1" /></span>
                                        <h6>Cake Walk F25</h6>
                                    </div>
                                    <div className="b"><span>vs</span></div>
                                    <div className="c">
                                        <img src="/assets/images/team2.png" alt="Team 2" />
                                        <h6>Code Yellow F25</h6>
                                    </div>
                                </div>
                                <div className="time"><i className="fa-solid fa-clock"></i><span>7 pm - 9 pm</span></div>
                                <a href="#" className="btn"><i className="fa-solid fa-location-dot"></i> california san diego</a>
                            </div>
                            <div className="item match-area">
                                <h4>sat 15 nov</h4>
                                <div className="middle-area">
                                    <div className="a">
                                        <span><img src="/assets/images/team1.png" alt="Team 1" /></span>
                                        <h6>Cake Walk F25</h6>
                                    </div>
                                    <div className="b"><span>vs</span></div>
                                    <div className="c">
                                        <img src="/assets/images/team2.png" alt="Team 2" />
                                        <h6>Code Yellow F25</h6>
                                    </div>
                                </div>
                                <div className="time"><i className="fa-solid fa-clock"></i><span>7 pm - 9 pm</span></div>
                                <a href="#" className="btn"><i className="fa-solid fa-location-dot"></i> california san diego</a>
                            </div>
                        </div>
                    </div>

                    <div className="tab-pane fade" id="pills-previous" role="tabpanel" aria-labelledby="pills-previous-tab">
                        <div className="owl-carousel owl-theme match-carousel">
                            <div className="item match-area">
                                <h4>sat 15 nov</h4>
                                <div className="middle-area">
                                    <div className="a">
                                        <span><img src="/assets/images/team1.png" alt="Team 1" /></span>
                                        <h6>Cake Walk F25</h6>
                                    </div>
                                    <div className="b"><span>vs</span></div>
                                    <div className="c">
                                        <img src="/assets/images/team2.png" alt="Team 2" />
                                        <h6>Code Yellow F25</h6>
                                    </div>
                                </div>
                                <div className="time"><i className="fa-solid fa-clock"></i><span>7 pm - 9 pm</span></div>
                                <a href="#" className="btn"><i className="fa-solid fa-location-dot"></i> california san diego</a>
                            </div>
                            <div className="item match-area">
                                <h4>sat 15 nov</h4>
                                <div className="middle-area">
                                    <div className="a">
                                        <span><img src="/assets/images/team1.png" alt="Team 1" /></span>
                                        <h6>Cake Walk F25</h6>
                                    </div>
                                    <div className="b"><span>vs</span></div>
                                    <div className="c">
                                        <img src="/assets/images/team2.png" alt="Team 2" />
                                        <h6>Code Yellow F25</h6>
                                    </div>
                                </div>
                                <div className="time"><i className="fa-solid fa-clock"></i><span>7 pm - 9 pm</span></div>
                                <a href="#" className="btn"><i className="fa-solid fa-location-dot"></i> california san diego</a>
                            </div>
                            <div className="item match-area">
                                <h4>sat 15 nov</h4>
                                <div className="middle-area">
                                    <div className="a">
                                        <span><img src="/assets/images/team1.png" alt="Team 1" /></span>
                                        <h6>Cake Walk F25</h6>
                                    </div>
                                    <div className="b"><span>vs</span></div>
                                    <div className="c">
                                        <img src="/assets/images/team2.png" alt="Team 2" />
                                        <h6>Code Yellow F25</h6>
                                    </div>
                                </div>
                                <div className="time"><i className="fa-solid fa-clock"></i><span>7 pm - 9 pm</span></div>
                                <a href="#" className="btn"><i className="fa-solid fa-location-dot"></i> california san diego</a>
                            </div>
                            <div className="item match-area">
                                <h4>sat 15 nov</h4>
                                <div className="middle-area">
                                    <div className="a">
                                        <span><img src="/assets/images/team1.png" alt="Team 1" /></span>
                                        <h6>Cake Walk F25</h6>
                                    </div>
                                    <div className="b"><span>vs</span></div>
                                    <div className="c">
                                        <img src="/assets/images/team2.png" alt="Team 2" />
                                        <h6>Code Yellow F25</h6>
                                    </div>
                                </div>
                                <div className="time"><i className="fa-solid fa-clock"></i><span>7 pm - 9 pm</span></div>
                                <a href="#" className="btn"><i className="fa-solid fa-location-dot"></i> california san diego</a>
                            </div>
                        </div>
                    </div>

                    <div className="tab-pane fade" id="pills-recent" role="tabpanel" aria-labelledby="pills-recent-tab">
                        <div className="owl-carousel owl-theme match-carousel">
                            <div className="item match-area">
                                <h4>sat 15 nov</h4>
                                <div className="middle-area">
                                    <div className="a">
                                        <span><img src="/assets/images/team1.png" alt="Team 1" /></span>
                                        <h6>Cake Walk F25</h6>
                                    </div>
                                    <div className="b"><span>vs</span></div>
                                    <div className="c">
                                        <img src="/assets/images/team2.png" alt="Team 2" />
                                        <h6>Code Yellow F25</h6>
                                    </div>
                                </div>
                                <div className="time"><i className="fa-solid fa-clock"></i><span>7 pm - 9 pm</span></div>
                                <a href="#" className="btn"><i className="fa-solid fa-location-dot"></i> california san diego</a>
                            </div>
                            <div className="item match-area">
                                <h4>sat 15 nov</h4>
                                <div className="middle-area">
                                    <div className="a">
                                        <span><img src="/assets/images/team1.png" alt="Team 1" /></span>
                                        <h6>Cake Walk F25</h6>
                                    </div>
                                    <div className="b"><span>vs</span></div>
                                    <div className="c">
                                        <img src="/assets/images/team2.png" alt="Team 2" />
                                        <h6>Code Yellow F25</h6>
                                    </div>
                                </div>
                                <div className="time"><i className="fa-solid fa-clock"></i><span>7 pm - 9 pm</span></div>
                                <a href="#" className="btn"><i className="fa-solid fa-location-dot"></i> california san diego</a>
                            </div>
                            <div className="item match-area">
                                <h4>sat 15 nov</h4>
                                <div className="middle-area">
                                    <div className="a">
                                        <span><img src="/assets/images/team1.png" alt="Team 1" /></span>
                                        <h6>Cake Walk F25</h6>
                                    </div>
                                    <div className="b"><span>vs</span></div>
                                    <div className="c">
                                        <img src="/assets/images/team2.png" alt="Team 2" />
                                        <h6>Code Yellow F25</h6>
                                    </div>
                                </div>
                                <div className="time"><i className="fa-solid fa-clock"></i><span>7 pm - 9 pm</span></div>
                                <a href="#" className="btn"><i className="fa-solid fa-location-dot"></i> california san diego</a>
                            </div>
                            <div className="item match-area">
                                <h4>sat 15 nov</h4>
                                <div className="middle-area">
                                    <div className="a">
                                        <span><img src="/assets/images/team1.png" alt="Team 1" /></span>
                                        <h6>Cake Walk F25</h6>
                                    </div>
                                    <div className="b"><span>vs</span></div>
                                    <div className="c">
                                        <img src="/assets/images/team2.png" alt="Team 2" />
                                        <h6>Code Yellow F25</h6>
                                    </div>
                                </div>
                                <div className="time"><i className="fa-solid fa-clock"></i><span>7 pm - 9 pm</span></div>
                                <a href="#" className="btn"><i className="fa-solid fa-location-dot"></i> california san diego</a>
                            </div>
                        </div>
                    </div>
                </div>




                
            </div>






        </section>





        <section className="strip-banner-section">
            <div className="image-area">
                <img src="/assets/images/strip-banner1.jpg" alt="" />
            </div>
            <div className="button-area">
                <a href="#" className="btn btn-primary">Register now</a>
            </div>
        </section>





        <section className="upcoming-match-section match-highlights-section section-padding">
            <div className="container">
                <div className="row align-items-center justify-content-between">
                    <div className="col-md-auto">
                        <div className="heading-area">
                            <h2>match highlights</h2>
                        </div>
                    </div>
                    <div className="col-md-auto">
                        <div className="match-carousel-nav">
                            <button id="mh-prev">
                                <span><i className="fa fa-angle-left"></i></span>
                            </button>
                            <button id="mh-next">
                                <span><i className="fa fa-angle-right"></i></span>
                            </button>
                        </div>
                    </div>
                    <div className="col-12"></div>
                </div>

                <div className="owl-carousel owl-theme match-highlights-carousel">
                    <div className="item">
                        <div className="image-area">
                            <img src="/assets/images/g1.jpg" alt="" />
                        </div>
                    </div>
                    <div className="item">
                        <div className="image-area">
                            <img src="/assets/images/g2.jpg" alt="" />
                        </div>
                    </div>
                    <div className="item">
                        <div className="image-area">
                            <img src="/assets/images/g3.jpg" alt="" />
                        </div>
                    </div>
                    <div className="item">
                        <div className="image-area">
                            <img src="/assets/images/g4.jpg" alt="" />
                        </div>
                    </div>
                </div>
            </div>
        </section>








        <section className="xflag-location section-padding bg-light-gray">
            <div className="container">
                <div className="text-center">
                    <h2>Featured LOCATIONS</h2>
                </div>
                <div className="row g-4">
                    <div className="col-sm-6 col-xl-3">
                        <div className="location-box">
                            <div className="image-area">
                                <img src="/assets/images/location-img.jpg" alt="" />
                            </div>
                            <div className="content-area">
                                <h4>Robb Field</h4>
                                <p>2525 Bacon St San Diego</p>
                                <Link href="/location-details">details</Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-6 col-xl-3">
                        <div className="location-box">
                            <div className="image-area">
                                <img src="/assets/images/location-img.jpg" alt="" />
                            </div>
                            <div className="content-area">
                                <h4>Robb Field</h4>
                                <p>2525 Bacon St San Diego</p>
                                <Link href="/location-details">details</Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-6 col-xl-3">
                        <div className="location-box">
                            <div className="image-area">
                                <img src="/assets/images/location-img.jpg" alt="" />
                            </div>
                            <div className="content-area">
                                <h4>Robb Field</h4>
                                <p>2525 Bacon St San Diego</p>
                                <Link href="/location-details">details</Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-6 col-xl-3">
                        <div className="location-box">
                            <div className="image-area">
                                <img src="/assets/images/location-img.jpg" alt="" />
                            </div>
                            <div className="content-area">
                                <h4>Robb Field</h4>
                                <p>2525 Bacon St San Diego</p>
                                <Link href="/location-details">details</Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="text-center mt-5">
                    <Link href="/locations" className="btn btn-primary">VIEW ALL LOCATIONS</Link>
                </div>
            </div>
        </section>


        <section className="scoreboard-section section-padding">
            <div className="container">
                <div className="row g-5 align-items-center">
                    <div className="col-xl-4">
                        <div className="left-area">
                            <div className="heading-area">
                                <h2>League Scoreboard</h2>
                                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                                <a href="#" className="btn btn-primary">VIEW MORE</a>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-8">
                        <div className="table-area">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Rank</th>
                                        <th>team</th>
                                        <th>gp</th>
                                        <th>w</th>
                                        <th>d</th>
                                        <th>l</th>
                                        <th>PTS</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>1</td>
                                        <td><img src="/assets/images/team1.png" alt="" /> Cake Walk F25</td>
                                        <td>7</td>
                                        <td>10</td>
                                        <td>5</td>
                                        <td>4</td>
                                        <td>12</td>
                                    </tr>
                                    <tr>
                                        <td>2</td>
                                        <td><img src="/assets/images/team2.png" alt="" /> Cake Walk F25</td>
                                        <td>7</td>
                                        <td>10</td>
                                        <td>5</td>
                                        <td>4</td>
                                        <td>12</td>
                                    </tr>
                                    <tr>
                                        <td>3</td>
                                        <td><img src="/assets/images/team1.png" alt="" /> Cake Walk F25</td>
                                        <td>7</td>
                                        <td>10</td>
                                        <td>5</td>
                                        <td>4</td>
                                        <td>12</td>
                                    </tr>
                                    <tr>
                                        <td>4</td>
                                        <td><img src="/assets/images/team2.png" alt="" /> Cake Walk F25</td>
                                        <td>7</td>
                                        <td>10</td>
                                        <td>5</td>
                                        <td>4</td>
                                        <td>12</td>
                                    </tr>
                                </tbody>
                            </table>

                            <div className="row align-items-center justify-content-between mt-5 mb-4">
                                <div className="col-auto">
                                    <a href="#" className="btn btn-primary">MEET THE PLAYER</a>
                                </div>
                                <div className="col-auto">
                                    <a href="#" className="btn btn-dark">SEE ALL PLAYER</a>
                                </div>
                            </div>

                            <div className="row ">
                                <div className="col-6">
                                    <div className="players-box">
                                        <div className="lf">
                                            <div className="image-area">
                                                <img src="/assets/images/player1.png" alt="" />
                                            </div>
                                        </div>
                                        <div className="rt">
                                            <span className="head">
                                                <img src="/assets/images/batch.png" alt="" /><span>top 5</span>
                                            </span>
                                            <ul>
                                                <li>Age : <span>27</span></li>
                                                <li>CLUB : <span><img src="/assets/images/team1.png" alt="" /></span></li>
                                                <li>Matches : <span>20</span></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-6">
                                    <div className="players-box">
                                        <div className="lf">
                                            <div className="image-area">
                                                <img src="/assets/images/player1.png" alt="" />
                                            </div>
                                        </div>
                                        <div className="rt">
                                            <span className="head">
                                                <img src="/assets/images/batch.png" alt="" /><span>top 5</span>
                                            </span>
                                            <ul>
                                                <li>Age : <span>27</span></li>
                                                <li>CLUB : <span><img src="/assets/images/team1.png" alt="" /></span></li>
                                                <li>Matches : <span>20</span></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>

                        
                    </div>
                </div>
            </div>
        </section>


        
        <section className="diffrence-section section-padding">
            <div className="container">
                <div className="row justify-content-end">
                    <div className="col-xl-8">
                        <div className="content-area">
                            <div className="heading-area">
                                <h2>The Difference We Deliver</h2>
                                <p>Experience, energy, and excellence in every match</p>
                            </div>
                            <div className="item-group">
                                <div className="item">
                                    <div className="lf">
                                        <img src="/assets/images/d1.png" alt="" />
                                    </div>
                                    <div className="rt">
                                        <h5>Professional Game Management</h5>
                                        <p>Every match is organized with expert planning, from scheduling to scorekeeping.</p>
                                    </div>
                                </div>

                                <div className="item">
                                    <div className="lf">
                                        <img src="/assets/images/d2.png" alt="" />
                                    </div>
                                    <div className="rt">
                                        <h5>Fair Play & Safety First</h5>
                                        <p>Certified referees and strict safety standards ensure every player enjoys the game.</p>
                                    </div>
                                </div>

                                <div className="item">
                                    <div className="lf">
                                        <img src="/assets/images/d3.png" alt="" />
                                    </div>
                                    <div className="rt">
                                        <h5>Top-Class Facilities</h5>
                                        <p>We provide premium fields, quality gear, and smooth logistics for every event.</p>
                                    </div>
                                </div>

                                <div className="item">
                                    <div className="lf">
                                        <img src="/assets/images/d4.png" alt="" />
                                    </div>
                                    <div className="rt">
                                        <h5>Community & Team Spirit</h5>
                                        <p>We bring players together — building friendships, sportsmanship, and a growing Flag Football community.</p>
                                    </div>
                                </div>
                            </div>
                            <a href="#" className="btn btn-primary">Read MORE</a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        


        <section className="sponsors-section section-padding">
            <div className="container">
                <h2>Sponsors</h2>
                <div className="owl-carousel owl-theme sponsors-carousel">
                    <div className="item">
                        <div className="image-area">
                            <img src="/assets/images/s1.jpg" alt="" />
                        </div>
                    </div>
                    <div className="item">
                        <div className="image-area">
                            <img src="/assets/images/s2.jpg" alt="" />
                        </div>
                    </div>
                    <div className="item">
                        <div className="image-area">
                            <img src="/assets/images/s3.jpg" alt="" />
                        </div>
                    </div>
                    <div className="item">
                        <div className="image-area">
                            <img src="/assets/images/s4.jpg" alt="" />
                        </div>
                    </div>
                    <div className="item">
                        <div className="image-area">
                            <img src="/assets/images/s5.jpg" alt="" />
                        </div>
                    </div>
                </div>
                <a href="#" className="btn btn-primary">Want to Sponsor ?</a>
            </div>
        </section>



        <section className="news-section section-padding">
            <div className="container">
                <div className="text-center">
                    <h2>League News and Updates</h2>
                </div>
                <div className="row gy-4">
                    <div className="col-sm-6 col-lg-3">
                        <div className="news-wrap">
                            <div className="image-area">
                                <img src="/assets/images/blog1.jpg" alt="" />
                            </div>
                            <div className="content-area">
                                <h4><a href="#">MENS LEAGUE - CASH COUNTIES XXI!</a></h4>
                                <p>Cash counties xxi! Come join the longest running flag league in the us! 10 stated games! <a href="#">Read more</a></p>
                            </div>
                        </div>
                    </div>

                    <div className="col-sm-6 col-lg-3">
                        <div className="news-wrap">
                            <div className="image-area">
                                <img src="/assets/images/blog2.jpg" alt="" />
                            </div>
                            <div className="content-area">
                                <h4><a href="#">SD Womens</a></h4>
                                <p>Hello Ladies! Come join XFlagFootballs Saturday Women's league in North Park on a turf field! <a href="#">Read more</a></p>
                            </div>
                        </div>
                    </div>

                    <div className="col-sm-6 col-lg-3">
                        <div className="news-wrap">
                            <div className="image-area">
                                <img src="/assets/images/blog3.jpg" alt="" />
                            </div>
                            <div className="content-area">
                                <h4><a href="#">MENS LEAGUE - CASH COUNTIES XXI!</a></h4>
                                <p>Cash counties xxi! Come join the longest running flag league in the us! 10 stated games! <a href="#">Read more</a></p>
                            </div>
                        </div>
                    </div>

                    <div className="col-sm-6 col-lg-3">
                        <div className="news-wrap">
                            <div className="image-area">
                                <img src="/assets/images/blog4.jpg" alt="" />
                            </div>
                            <div className="content-area">
                                <h4><a href="#">Women’s North Park</a></h4>
                                <p>Cash counties xxi! Come join the longest running flag league in the us! 10 stated games! <a href="#">Read more</a></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>



        <section className="testimonials-section section-padding">
            <div className="container">
                <div className="text-center">
                    <h2>What Our Players Say</h2>
                </div>
                <div className="testimonial-wrap">

                    {/* owl-carousel */}
                    <div className="owl-carousel owl-theme testimonial-carousel">
                        <div className="testimonial-item item">
                            <div className="content-area">
                                <ul className="star-rating">
                                    <li><i className="fa-solid fa-star"></i></li>
                                    <li><i className="fa-solid fa-star"></i></li>
                                    <li><i className="fa-solid fa-star"></i></li>
                                    <li><i className="fa-solid fa-star"></i></li>
                                    <li><i className="fa-solid fa-star"></i></li>
                                </ul>
                                <p>Best Flag Football Ever! Best Flag Football Ever! Best Flag Football Ever! Best Flag Football Ever! Best Flag Football Ever!</p>
                            </div>
                            <div className="author-area">
                                <div className="lf">
                                    <img src="/assets/images/t1.png" alt="" />
                                </div>
                                <div className="rt">
                                    <h5>John Flores</h5>
                                    <p>Aug 20, 2020</p>
                                </div>
                            </div>
                        </div>

                        <div className="testimonial-item item">
                            <div className="content-area">
                                <ul className="star-rating">
                                    <li><i className="fa-solid fa-star"></i></li>
                                    <li><i className="fa-solid fa-star"></i></li>
                                    <li><i className="fa-solid fa-star"></i></li>
                                    <li><i className="fa-solid fa-star"></i></li>
                                    <li><i className="fa-solid fa-star"></i></li>
                                </ul>
                                <p>Best Flag Football Ever! Best Flag Football Ever! Best Flag Football Ever! Best Flag Football Ever! Best Flag Football Ever!</p>
                            </div>
                            <div className="author-area">
                                <div className="lf">
                                    <img src="/assets/images/t1.png" alt="" />
                                </div>
                                <div className="rt">
                                    <h5>John Flores</h5>
                                    <p>Aug 20, 2020</p>
                                </div>
                            </div>
                        </div>

                        <div className="testimonial-item item">
                            <div className="content-area">
                                <ul className="star-rating">
                                    <li><i className="fa-solid fa-star"></i></li>
                                    <li><i className="fa-solid fa-star"></i></li>
                                    <li><i className="fa-solid fa-star"></i></li>
                                    <li><i className="fa-solid fa-star"></i></li>
                                    <li><i className="fa-solid fa-star"></i></li>
                                </ul>
                                <p>Best Flag Football Ever! Best Flag Football Ever! Best Flag Football Ever! Best Flag Football Ever! Best Flag Football Ever!</p>
                            </div>
                            <div className="author-area">
                                <div className="lf">
                                    <img src="/assets/images/t1.png" alt="" />
                                </div>
                                <div className="rt">
                                    <h5>John Flores</h5>
                                    <p>Aug 20, 2020</p>
                                </div>
                            </div>
                        </div>

                        <div className="testimonial-item item">
                            <div className="content-area">
                                <ul className="star-rating">
                                    <li><i className="fa-solid fa-star"></i></li>
                                    <li><i className="fa-solid fa-star"></i></li>
                                    <li><i className="fa-solid fa-star"></i></li>
                                    <li><i className="fa-solid fa-star"></i></li>
                                    <li><i className="fa-solid fa-star"></i></li>
                                </ul>
                                <p>Best Flag Football Ever! Best Flag Football Ever! Best Flag Football Ever! Best Flag Football Ever! Best Flag Football Ever!</p>
                            </div>
                            <div className="author-area">
                                <div className="lf">
                                    <img src="/assets/images/t1.png" alt="" />
                                </div>
                                <div className="rt">
                                    <h5>John Flores</h5>
                                    <p>Aug 20, 2020</p>
                                </div>
                            </div>
                        </div>
                    </div>
                      




                </div>
            </div>
        </section>
      <Footer />
    </div>
  );
}
