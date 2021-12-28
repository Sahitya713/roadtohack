import React from "react";

import { selectCurrChallenge } from "../../redux/challenge/challenge.selectors";
import { selectQuestions } from "../../redux/question/question.selectors";
import { selectCurrentUserName } from "../../redux/user/user.selectors";
import { selectAnswerStatuses } from "../../redux/answer/answer.selectors";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
// import { Link } from "react-router-dom";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
// import AssignmentTurnedInIcon from "@material-ui/icons/AssignmentTurnedIn";

import "./homepage.styles.css";
import MarkerCard from "../../components/marker/marker.component";

class Homepage extends React.Component {
  constructor() {
    super();
    this.state = {
      viewport: {
        width: "100%",
        height: "100%",
        latitude: 1.2851,
        longitude: 103.8329,
        zoom: 16.5,
      },
      selectedQnId: null,
    };
  }

  handleAddClick(e) {
    console.log(e);
  }

  handleMarkerClick = (id) => {
    this.setState({ selectedQnId: id });
    // this.setState({
    //   viewport: { ...this.state.viewport, latitude: lat, longitude: long },
    // });
  };
  render() {
    const { challenge, questions, currUserName, answerStatuses } = this.props;

    const { viewport, selectedQnId } = this.state;
    const additionalMapCond = {
      maxZoom: 18,
      minZoom: 16,
      // dragPan: false,
      dragRotate: false,
      bearing: -20,
      pitch: 60,
      // altitude: 20,
    };

    return (
      <div className="map-overlay">
        <ReactMapGL
          {...viewport}
          {...additionalMapCond}
          // mapboxApiAccessToken={process.env.REACT_APP_MAPBOX}
          mapboxApiAccessToken="pk.eyJ1Ijoic2FoaXR5YTAwMiIsImEiOiJja3JxZG5idGYwbHlrMm5wZmN6cWVzMnh6In0.b5gsWfXOHgkk028Wsg7FtQ"
          onViewportChange={(nextViewport) =>
            this.setState({ viewport: nextViewport })
          }
          // mapStyle="mapbox://styles/sahitya002/ckrp3bot41jlh17p4riu1tllq"
          mapStyle="mapbox://styles/sahitya002/ckxpovgaw6y0g14mm6qrzdlw5"
          onDblClick={this.handleAddClick}
          className="map"
        >
          <div className="homepage-overlay">
            <h1 className="homepage-title">{challenge.title}</h1>
            <div className="homepage-desc">
              <p>
                Hey there Hacker {currUserName}! {challenge.description}
              </p>
              <p>
                Navigate through the map and solve all the problems as a team.
                See the problem details by clicking on the marker.
              </p>
              <p>
                You can view the leaderboard to see how the other teams are
                performing and the team tab to edit your team profile and to see
                what your teammates are doing!
              </p>
            </div>
          </div>

          {questions.map(
            ({ title, slug, location, _id, points, questionType }, idx) => (
              <div key={idx}>
                {/* <Link to={`${match.url}/question/${slug}`}>{title}</Link> */}
                <Marker
                  latitude={location.lat}
                  longitude={location.long}
                  offsetLeft={-25}
                  offsetTop={-40}
                >
                  <i
                    onClick={() => this.handleMarkerClick(_id)}
                    className={
                      answerStatuses[_id]
                        ? `material-icons ${answerStatuses[_id]}`
                        : "material-icons maybe"
                    }
                  ></i>
                </Marker>
                {_id === selectedQnId && (
                  <Popup
                    latitude={location.lat}
                    longitude={location.long}
                    closeButton={true}
                    closeOnClick={false}
                    onClose={() => this.setState({ selectedQnId: null })}
                    anchor="bottom"
                    offsetTop={-40}
                    className="marker-popup-overlay"
                  >
                    <MarkerCard
                      questionTitle={title}
                      link={`/question/${slug}`}
                      locName={location.name}
                      points={points}
                      questionType={questionType}
                    />
                  </Popup>
                )}
              </div>
            )
          )}
        </ReactMapGL>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  challenge: selectCurrChallenge,
  questions: selectQuestions,
  currUserName: selectCurrentUserName,
  answerStatuses: selectAnswerStatuses,
});
export default connect(mapStateToProps)(Homepage);
