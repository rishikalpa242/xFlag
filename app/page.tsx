
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { readCmsData } from '@/lib/cms';
import { getLiveOrganization, getLiveSchedules, getLiveLeagues, getLiveStandings } from '@/lib/flagmag';

export default async function Home() {
  const cmsData = await readCmsData();
  const hp = cmsData.homepage;
  if (!hp) return null;

  const org = await getLiveOrganization();
  const liveLocations = org?.locations?.slice(0, 4) || [];

  const liveGames = await getLiveSchedules();
  const upcomingGames = liveGames.filter((g: any) => g.status !== 'completed').slice(0, 4);
  const pastGames = liveGames.filter((g: any) => g.status === 'completed').slice(0, 4);

  const leagues = await getLiveLeagues();
  const firstLeagueSlug = leagues[0]?.slug;
  const liveStandings = firstLeagueSlug ? await getLiveStandings(firstLeagueSlug) : [];
  const firstDivisionRows = liveStandings[0]?.rows?.slice(0, 4) || [];

  return (
    <div className="wrapper">
      <Header />
      <section className="homepage-banner">
        <div className="owl-carousel owl-theme homepage-banner-carousel">
          {hp.banners.map((banner) => (
            <div key={banner.id} className="item">
              <div className="banner-section">
                <div className="image-area">
                  <img src={banner.image} alt={banner.title} />
                </div>
                <div className="container-fluid">
                  <div className="banner-area">
                    <h2>{banner.title}</h2>
                    <h5>{banner.subtitle}</h5>
                    <Link href={banner.ctaLink} className="btn btn-primary">{banner.ctaText}</Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>


        <section className="success-section section-padding">
            <div className="container">
                <div className="text-center">
                    <h2>{hp.successSection.title}</h2>
                </div>
                
                <div className="row gy-4">
                    {hp.successSection.stats.map(stat => (
                        <div key={stat.id} className="col-6 col-xl-3">
                            <div className="counter-area">
                                <h3>{stat.number}</h3>
                                <p>{stat.label}</p>
                            </div>
                        </div>
                    ))}
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
                    </ul>
                </div>
            </div>
            
            <div className="container match-carousel-main">
                <div className="tab-content" id="pills-tabContent">
                    <div className="tab-pane fade show active" id="pills-upcoming" role="tabpanel" aria-labelledby="pills-upcoming-tab">
                        <div className="owl-carousel owl-theme match-carousel">
                            {upcomingGames.length > 0 ? upcomingGames.map((game: any, i: number) => (
                                <div key={i} className="item match-area">
                                    <h4>{new Date(game.date).toLocaleDateString('en-US', { weekday: 'short', day: 'numeric', month: 'short' })}</h4>
                                    <div className="middle-area">
                                        <div className="a">
                                            <span><img src={game.teamA?.logo || "/assets/images/team1.png"} alt={game.teamA?.name} /></span>
                                            <h6>{game.teamA?.name}</h6>
                                        </div>
                                        <div className="b"><span>vs</span></div>
                                        <div className="c">
                                            <img src={game.teamB?.logo || "/assets/images/team2.png"} alt={game.teamB?.name} />
                                            <h6>{game.teamB?.name}</h6>
                                        </div>
                                    </div>
                                    <div className="time"><i className="fa-solid fa-clock"></i><span>{game.time}</span></div>
                                    <a href="#" className="btn"><i className="fa-solid fa-location-dot"></i> {game.locationName}</a>
                                </div>
                            )) : (
                                <div className="text-center py-5 text-muted w-100">No upcoming games found.</div>
                            )}
                        </div>
                    </div>

                    <div className="tab-pane fade" id="pills-previous" role="tabpanel" aria-labelledby="pills-previous-tab">
                        <div className="owl-carousel owl-theme match-carousel">
                            {pastGames.length > 0 ? pastGames.map((game: any, i: number) => (
                                <div key={i} className="item match-area">
                                    <h4>{new Date(game.date).toLocaleDateString('en-US', { weekday: 'short', day: 'numeric', month: 'short' })}</h4>
                                    <div className="middle-area">
                                        <div className="a">
                                            <span><img src={game.teamA?.logo || "/assets/images/team1.png"} alt={game.teamA?.name} /></span>
                                            <h6>{game.teamA?.name} ({game.teamA?.score ?? 0})</h6>
                                        </div>
                                        <div className="b"><span>-</span></div>
                                        <div className="c">
                                            <img src={game.teamB?.logo || "/assets/images/team2.png"} alt={game.teamB?.name} />
                                            <h6>{game.teamB?.name} ({game.teamB?.score ?? 0})</h6>
                                        </div>
                                    </div>
                                    <div className="time"><i className="fa-solid fa-clock"></i><span>Final</span></div>
                                    <a href="#" className="btn"><i className="fa-solid fa-location-dot"></i> {game.locationName}</a>
                                </div>
                            )) : (
                                <div className="text-center py-5 text-muted w-100">No previous games found.</div>
                            )}
                        </div>
                    </div>
                </div>





                
            </div>






        </section>





        <section className="strip-banner-section">
            <div className="image-area">
                <img src={hp.stripBanner.image} alt="" />
            </div>
            <div className="button-area">
                <Link href={hp.stripBanner.ctaLink} className="btn btn-primary">{hp.stripBanner.ctaText}</Link>
            </div>
        </section>





        <section className="upcoming-match-section match-highlights-section section-padding">
            <div className="container">
                <div className="row align-items-center justify-content-between">
                    <div className="col-md-auto">
                        <div className="heading-area">
                            <h2>{hp.matchHighlights.title}</h2>
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
                    {hp.matchHighlights.images.map(img => (
                        <div key={img.id} className="item">
                            <div className="image-area">
                                <img src={img.image} alt="" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>








        <section className="xflag-location section-padding bg-light-gray">
            <div className="container">
                <div className="text-center">
                    <h2>{hp.featuredLocations.title}</h2>
                </div>
                <div className="row g-4">
                    {liveLocations.length > 0 ? liveLocations.map((loc: any, i: number) => (
                        <div key={i} className="col-sm-6 col-xl-3">
                            <div className="location-box">
                                <div className="image-area">
                                    <img src={hp.featuredLocations.locations[0]?.image || "/assets/images/location-img.jpg"} alt={loc.locationName} />
                                </div>
                                <div className="content-area">
                                    <h4>{loc.locationName || loc.cityName}</h4>
                                    <p>{loc.cityName}, {loc.stateAbbr}</p>
                                    <Link href={`/location-details?id=${loc.location || ''}`}>details</Link>
                                </div>
                            </div>
                        </div>
                    )) : (
                        <div className="col-12 text-center text-muted">No locations scheduled yet.</div>
                    )}
                </div>
                <div className="text-center mt-5">
                    <Link href={hp.featuredLocations.ctaLink} className="btn btn-primary">{hp.featuredLocations.ctaText}</Link>
                </div>
            </div>
        </section>


        <section className="scoreboard-section section-padding">
            <div className="container">
                <div className="row g-5 align-items-center">
                    <div className="col-xl-4">
                        <div className="left-area">
                            <div className="heading-area">
                                <h2>{hp.scoreboardSection.title}</h2>
                                <p>{hp.scoreboardSection.description}</p>
                                <Link href={hp.scoreboardSection.ctaLink} className="btn btn-primary">{hp.scoreboardSection.ctaText}</Link>
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
                                        <th>w</th>
                                        <th>l</th>
                                        <th>DIFF</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {firstDivisionRows.length > 0 ? firstDivisionRows.map((team: any, i: number) => (
                                        <tr key={i}>
                                            <td>{i + 1}</td>
                                            <td><img src={team.logo || "/assets/images/team1.png"} alt="" style={{width: 24, marginRight: 10}} /> {team.name}</td>
                                            <td>{team.wins}</td>
                                            <td>{team.losses}</td>
                                            <td>{team.diff > 0 ? `+${team.diff}` : team.diff}</td>
                                        </tr>
                                    )) : (
                                        <tr><td colSpan={5} className="text-center text-muted">No stats available.</td></tr>
                                    )}
                                </tbody>
                            </table>
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
                                <h2>{hp.differenceSection.title}</h2>
                                <p>{hp.differenceSection.subtitle}</p>
                            </div>
                            <div className="item-group">
                                {hp.differenceSection.items.map(item => (
                                    <div key={item.id} className="item">
                                        <div className="lf">
                                            <img src={item.icon} alt="" />
                                        </div>
                                        <div className="rt">
                                            <h5>{item.title}</h5>
                                            <p>{item.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <Link href={hp.differenceSection.ctaLink} className="btn btn-primary">{hp.differenceSection.ctaText}</Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        


        <section className="sponsors-section section-padding">
            <div className="container">
                <h2>{hp.sponsorsSection.title}</h2>
                <div className="owl-carousel owl-theme sponsors-carousel">
                    {hp.sponsorsSection.sponsors.map(sponsor => (
                        <div key={sponsor.id} className="item">
                            <div className="image-area">
                                <img src={sponsor.image} alt="" />
                            </div>
                        </div>
                    ))}
                </div>
                <Link href={hp.sponsorsSection.ctaLink} className="btn btn-primary">{hp.sponsorsSection.ctaText}</Link>
            </div>
        </section>



        <section className="news-section section-padding">
            <div className="container">
                <div className="text-center">
                    <h2>{hp.newsSection.title}</h2>
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
                    <h2>{hp.testimonialsSection.title}</h2>
                </div>
                <div className="testimonial-wrap">

                    {/* owl-carousel */}
                    <div className="owl-carousel owl-theme testimonial-carousel">
                        {hp.testimonialsSection.testimonials.map(testimonial => (
                            <div key={testimonial.id} className="testimonial-item item">
                                <div className="content-area">
                                    <ul className="star-rating">
                                        {Array.from({ length: 5 }).map((_, i) => (
                                            <li key={i}><i className={`fa-solid fa-star ${i >= testimonial.rating ? 'opacity-50' : ''}`}></i></li>
                                        ))}
                                    </ul>
                                    <p>{testimonial.text}</p>
                                </div>
                                <div className="author-area">
                                    <div className="lf">
                                        <img src={testimonial.authorImage} alt={testimonial.authorName} />
                                    </div>
                                    <div className="rt">
                                        <h5>{testimonial.authorName}</h5>
                                        <p>{testimonial.date}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </section>
      <Footer />
    </div>
  );
}
