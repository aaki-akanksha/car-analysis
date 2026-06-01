import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import heroImg from "./assets/hero.png";
import "./App.css";
import shortlistCars from "./main.js";

function App() {
  const [currentPhase, setCurrentPhase] = useState(1);
  const [budget, setBudget] = useState(12);
  const [selectedCards, setSelectedCards] = useState([]);
  const [saved, setSaved] = useState(false);
  const [answers, setAnswers] = useState({});
  const [mustHaves, setMustHaves] = useState([]);
  const [shortlistedCars, setShortlistedCars] = useState([])

  const nextPhase = (target) => {
    setCurrentPhase(target);

    console.log("Answers:", answers);
    console.log("Must-haves:", mustHaves);

    if (target === "loading") {
      setShortlistedCars(shortlistCars(answers, mustHaves, budget));
    }
  };

  useEffect(() => {
    console.log("Shortlisted cars:", shortlistedCars[0]);
    if (currentPhase === "loading") {
      setCurrentPhase(3);
    }
  }, [shortlistedCars])

  const updateBudget = (value) => {
    setBudget(value);
  };

  const showSaved = () => {
    setSaved(true);
  };

  const selectChip = (group, value) => {
    setAnswers((prev) => ({
      ...prev,
      [group]: value,
    }));
    console.log(group, value);
  };

  const toggleCardSelect = (id) => {
    setSelectedCards((prev) => {
      if (prev.includes(id)) {
        return prev.filter((c) => c !== id);
      }

      if (prev.length >= 2) {
        return [prev[1], id];
      }

      return [...prev, id];
    });
  };

  const toggleMulti = (feature) => {
    setMustHaves((prev) =>
      prev.includes(feature)
        ? prev.filter((item) => item !== feature)
        : [...prev, feature],
    );
  };

  return (
    <div className="app-root">
      <div className="header">
        <div className="header-brand">
          drive<span>wise</span>
        </div>
        <div>
          <div className="progress-label" id="prog-label">
            Step 1 of 5
          </div>
          <div className="progress-bar-wrap">
            <div
              className="progress-bar-fill"
              id="prog-bar"
              style={{ width: "20%" }}
            ></div>
          </div>
        </div>
      </div>

      <div className="phase-dots">
        <div className="dot current" id="dot-1"></div>
        <div className="dot" id="dot-2"></div>
        <div className="dot" id="dot-3"></div>
        <div className="dot" id="dot-4"></div>
        <div className="dot" id="dot-5"></div>
      </div>

      {currentPhase === 1 && (
        <div className="phase active" id="phase-1">
          <div className="phase-eyebrow">Phase 1 · Life situation</div>
          <div className="phase-heading">
            Tell us about
            <br />
            <em style={{ fontStyle: "italic" }}>your life</em>, not specs
          </div>
          <div className="phase-sub">
            We'll figure out the right car from your routine — not from a
            dropdown.
          </div>

          <div className="question-block">
            <div className="question-label">
              How do you primarily use your car?
            </div>
            <div className="chip-row" id="q1">
              <div
                className={`chip ${answers.q1 === "Daily commute" ? "selected" : ""}`}
                onClick={() => selectChip("q1", "Daily commute")}
              >
                Daily commute
              </div>
              <div
                className={`chip ${answers.q1 === "Family trips" ? "selected" : ""}`}
                data-group="q1"
                onClick={() => selectChip("q1", "Family trips")}
              >
                Family trips
              </div>
              <div
                className={`chip ${answers.q1 === "Weekend drives" ? "selected" : ""}`}
                data-group="q1"
                onClick={() => selectChip("q1", "Weekend drives")}
              >
                Weekend drives
              </div>
              <div
                className={`chip ${answers.q1 === "Long highway runs" ? "selected" : ""}`}
                data-group="q1"
                onClick={() => selectChip("q1", "Long highway runs")}
              >
                Long highway runs
              </div>
            </div>
          </div>

          <div className="question-block">
            <div className="question-label">Where do you mostly drive?</div>
            <div className="chip-row" id="q2">
              <div
                className={`chip ${answers.q2 === "City / urban" ? "selected" : ""}`}
                data-group="q2"
                onClick={() => selectChip("q2", "City / urban")}
              >
                City / urban
              </div>
              <div
                className={`chip ${answers.q2 === "Suburbs" ? "selected" : ""}`}
                data-group="q2"
                onClick={() => selectChip("q2", "Suburbs")}
              >
                Suburbs
              </div>
              <div
                className={`chip ${answers.q2 === "Mix of both" ? "selected" : ""}`}
                data-group="q2"
                onClick={() => selectChip("q2", "Mix of both")}
              >
                Mix of both
              </div>
              <div
                className={`chip ${answers.q2 === "Highways mostly" ? "selected" : ""}`}
                data-group="q2"
                onClick={() => selectChip("q2", "Highways mostly")}
              >
                Highways mostly
              </div>
            </div>
          </div>

          <div className="question-block">
            <div className="question-label">Who rides with you regularly?</div>
            <div className="chip-row" id="q3">
              <div
                className={`chip ${answers.q3 === "Just me" ? "selected" : ""}`}
                data-group="q3"
                onClick={() => selectChip("q3", "Just me")}
              >
                Just me
              </div>
              <div
                className={`chip ${answers.q3 === "Partner" ? "selected" : ""}`}
                data-group="q3"
                onClick={() => selectChip("q3", "Partner")}
              >
                Partner
              </div>
              <div
                className={`chip ${answers.q3 === "Kids too" ? "selected" : ""}`}
                data-group="q3"
                onClick={() => selectChip("q3", "Kids too")}
              >
                Kids too
              </div>
              <div
                className={`chip ${answers.q3 === "Full family + gear" ? "selected" : ""}`}
                data-group="q3"
                onClick={() => selectChip("q3", "Full family + gear")}
              >
                Full family + gear
              </div>
            </div>
          </div>

          <div className="question-block">
            <div className="question-label">Parking situation at home?</div>
            <div className="chip-row" id="q4">
              <div
                className={`chip ${answers.q4 === "Tight street parking" ? "selected" : ""}`}
                data-group="q4"
                onClick={() => selectChip("q4", "Tight street parking")}
              >
                Tight street parking
              </div>
              <div
                className={`chip ${answers.q4 === "Garage / ample space" ? "selected" : ""}`}
                data-group="q4"
                onClick={() => selectChip("q4", "Garage / ample space")}
              >
                Garage / ample space
              </div>
              <div
                className={`chip ${answers.q4 === "Society parking lot" ? "selected" : ""}`}
                data-group="q4"
                onClick={() => selectChip("q4", "Society parking lot")}
              >
                Society parking lot
              </div>
            </div>
          </div>

          <button className="cta-btn" onClick={() => nextPhase(2)}>
            Continue →
          </button>
          <br />
        </div>
      )}

      {currentPhase === 2 && (
        <div className="phase active" id="phase-2">
          <div className="phase-eyebrow">Phase 2 · Budget & must-haves</div>
          <div className="phase-heading">
            Set your <em style={{ fontStyle: "italic" }}>limits</em>
          </div>
          <div className="phase-sub">
            We'll only show cars that actually fit your budget — no teaser
            pricing.
          </div>

          <div className="question-block">
            <div className="question-label">Total budget (on-road)</div>
            <div className="budget-display">
              ₹<span id="budget-val">{budget}</span>L
            </div>
            <input
              type="range"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
            />

            <span>{budget}</span>
          </div>

          <div className="question-block">
            <div className="question-label">Fuel preference</div>
            <div className="chip-row" id="q5">
              <div
                className={`chip ${answers.q5 === "Petrol" ? "selected" : ""}`}
                data-group="q5"
                onClick={() => selectChip("q5", "Petrol")}
              >
                Petrol
              </div>
              <div
                className={`chip ${answers.q5 === "Diesel" ? "selected" : ""}`}
                data-group="q5"
                onClick={() => selectChip("q5", "Diesel")}
              >
                Diesel
              </div>
              <div
                className={`chip ${answers.q5 === "CNG" ? "selected" : ""}`}
                data-group="q5"
                onClick={() => selectChip("q5", "CNG")}
              >
                CNG
              </div>
              <div
                className={`chip ${answers.q5 === "Electric (EV)" ? "selected" : ""}`}
                data-group="q5"
                onClick={() => selectChip("q5", "Electric (EV)")}
              >
                Electric (EV)
              </div>
              <div
                className={`chip ${answers.q5 === "No preference" ? "selected" : ""}`}
                data-group="q5"
                onClick={() => selectChip("q5", "No preference")}
              >
                No preference
              </div>
            </div>
          </div>

          <div className="question-block">
            <div className="question-label">
              Must-haves (pick all that apply)
            </div>
            <div className="chip-row">
              <div
                className={`chip multi ${
                  mustHaves.includes("Automatic gearbox") ? "selected" : ""
                }`}
                onClick={() => toggleMulti("Automatic gearbox")}
              >
                Automatic gearbox
              </div>
              <div
                className={`chip multi ${
                  mustHaves.includes("High ground clearance") ? "selected" : ""
                }`}
                onClick={() => toggleMulti("High ground clearance")}
              >
                High ground clearance
              </div>
              <div
                className={`chip multi ${
                  mustHaves.includes("6 airbags") ? "selected" : ""
                }`}
                onClick={() => toggleMulti("6 airbags")}
              >
                6 airbags
              </div>
              <div
                className={`chip multi ${
                  mustHaves.includes("Sunroof") ? "selected" : ""
                }`}
                onClick={() => toggleMulti("Sunroof")}
              >
                Sunroof
              </div>
              <div
                className={`chip multi ${
                  mustHaves.includes("Apple CarPlay") ? "selected" : ""
                }`}
                onClick={() => toggleMulti("Apple CarPlay")}
              >
                Apple CarPlay
              </div>
              <div
                className={`chip multi ${
                  mustHaves.includes("Boot space (>400L)") ? "selected" : ""
                }`}
                onClick={() => toggleMulti("Boot space (>400L)")}
              >
                Boot space (&gt;400L)
              </div>
              <div
                className={`chip multi ${
                  mustHaves.includes("Good highway mileage") ? "selected" : ""
                }`}
                onClick={() => toggleMulti("Good highway mileage")}
              >
                Good highway mileage
              </div>
            </div>
          </div>

          <button className="cta-btn" onClick={() => nextPhase("loading")}>
            Find my shortlist →
          </button>
          <button className="back-link" onClick={() => nextPhase(1)}>
            ← Back
          </button>
        </div>
      )}

      {currentPhase === "loading" && (
        <div className="phase active" id="phase-loading">
          <div className="loading-wrap">
            <div className="loading-ring"></div>
            <div className="loading-text">Matching cars to your life…</div>
          </div>
        </div>
      )}

      {currentPhase === 3 && (
        <div className="phase active" id="phase-3">
          <div className="phase-eyebrow">Phase 3 · Your shortlist</div>
          <div className="phase-heading">
            4 cars picked <em style={{ fontStyle: "italic" }}>for you</em>
          </div>
          <div className="phase-sub">
            Ranked by fit with your commute, family setup, and budget — not by
            popularity.
          </div>

          <div className="shortlist-list">
            {shortlistedCars.map((car) => (
              <div
                key={car.id}
                className={`car-card ${
                  selectedCards.includes(car.id) ? "selected-card" : ""
                }`}
                onClick={() => toggleCardSelect(car.id)}
              >
                <div className="car-card-top">
                  <div>
                    <div className="car-card-name">{car.make} {car.model}</div>
                    <div className="car-card-variant">{car.bodyType}</div>
                  </div>

                  <div className={`fit-badge ${car.fitScore >= 90 ? "top" : ""}`}>
                    {car.fitScore}% fit
                  </div>
                </div>

                <div className="spec-pills"> 
                  <span className="spec-pill">₹ {car.onRoadPrice}</span>
                  <span className="spec-pill">{car.mileage} km/L</span>
                  <span className="spec-pill">{car.fuelType}</span>
                  <span className="spec-pill">{car.safetyRating}★</span>
                  <span className="spec-pill">{car.transmission}</span>
                </div>
                <div className="why-text-card">
                  <span className="spec-pill">{car.features?.join(", ")}</span>
                </div>

              </div>
            ))}
          </div>

          <button
            className="cta-btn accent"
            onClick={() => nextPhase(4)}
            id="compare-btn"
            disabled
            style={{ opacity: "0.4" }}
          >
            Compare selected cars →
          </button>
          <div
            style={{
              fontSize: "12px",
              color: "var(--ink3)",
              textAlign: "center",
              marginTop: "6px",
            }}
          >
            Select 2 cars above to compare
          </div>
          <button className="back-link" onClick={() => nextPhase(2)}>
            ← Back to filters
          </button>
        </div>
      )}

      {currentPhase === 4 && (
        <div className="phase active" id="phase-3">
          <div className="phase-eyebrow">Phase 3 · Your shortlist</div>
          <div className="phase-heading">
            4 cars picked <em style={{ fontStyle: "italic" }}>for you</em>
          </div>
          <div className="phase-sub">
            Ranked by fit with your commute, family setup, and budget — not by
            popularity.
          </div>

          <div className="shortlist-list">
            <div
              className="car-card"
              id="car-tata"
              onClick={() => toggleCardSelect("car-tata")}
            >
              <div className="car-card-top">
                <div>
                  <div className="car-card-name">Tata Nexon</div>
                  <div className="car-card-variant">
                    XZ+ (S) Petrol · Automatic
                  </div>
                </div>
                <div className="fit-badge top">94% fit</div>
              </div>
              <div className="car-card-body">
                <div className="why-text-card">
                  Compact enough for city parking, high enough ground clearance
                  for mixed roads, and the 5-star GNCAP rating means your family
                  is well-protected.
                </div>
                <div className="spec-pills">
                  <span className="spec-pill">₹10.5 - 11.8L</span>
                  <span className="spec-pill">17 km/L</span>
                  <span className="spec-pill">5★ GNCAP</span>
                  <span className="spec-pill">Sunroof</span>
                  <span className="spec-pill">382L boot</span>
                </div>
                <div className="review-quote">
                  "Best combination of safety and practicality in this segment.
                  The AMT is perfect for Mumbai traffic."
                  <div className="review-attr">— Owner, 18 months</div>
                </div>
              </div>
            </div>

            <div
              className="car-card"
              id="car-maruti"
              onClick={() => toggleCardSelect("car-maruti")}
            >
              <div className="car-card-top">
                <div>
                  <div className="car-card-name">Maruti Brezza</div>
                  <div className="car-card-variant">
                    ZXi+ Petrol · Automatic
                  </div>
                </div>
                <div className="fit-badge">88% fit</div>
              </div>
              <div className="car-card-body">
                <div className="why-text-card">
                  Lowest running cost in the segment — Maruti's service network
                  is unmatched if you're not always near a big city. Slightly
                  better mileage for daily commuters.
                </div>
                <div className="spec-pills">
                  <span className="spec-pill">₹10.8 - 12.1L</span>
                  <span className="spec-pill">19.8 km/L</span>
                  <span className="spec-pill">Sunroof</span>
                  <span className="spec-pill">328L boot</span>
                  <span className="spec-pill warn">4★ GNCAP</span>
                </div>
                <div className="review-quote">
                  "The mileage is real — I'm getting 17 in city driving. Service
                  costs almost nothing."
                  <div className="review-attr">— Owner, 11 months</div>
                </div>
              </div>
            </div>

            <div
              className="car-card"
              id="car-hyundai"
              onClick={() => toggleCardSelect("car-hyundai")}
            >
              <div className="car-card-top">
                <div>
                  <div className="car-card-name">Hyundai Venue</div>
                  <div className="car-card-variant">SX(O) Petrol · DCT</div>
                </div>
                <div className="fit-badge">81% fit</div>
              </div>
              <div className="car-card-body">
                <div className="why-text-card">
                  The smoothest automatic in this price range — the dual-clutch
                  gearbox is genuinely enjoyable. Smaller footprint makes
                  parking easier. Slightly tight for rear passengers.
                </div>
                <div className="spec-pills">
                  <span className="spec-pill">₹11.9 - 13.4L</span>
                  <span className="spec-pill">18.1 km/L</span>
                  <span className="spec-pill">Connected car tech</span>
                  <span className="spec-pill warn">Less rear legroom</span>
                </div>
                <div className="review-quote">
                  "DCT is buttery smooth. But if you're tall, the rear seat gets
                  cramped on long drives."
                  <div className="review-attr">— Owner, 9 months</div>
                </div>
              </div>
            </div>

            <div
              className="car-card"
              id="car-kia"
              onClick={() => toggleCardSelect("car-kia")}
            >
              <div className="car-card-top">
                <div>
                  <div className="car-card-name">Kia Sonet</div>
                  <div className="car-card-variant">
                    HTX+ Diesel · Automatic
                  </div>
                </div>
                <div className="fit-badge">76% fit</div>
              </div>
              <div className="car-card-body">
                <div className="why-text-card">
                  Best pick if highway runs matter — diesel mileage of 24+ km/L
                  cuts costs significantly. Slightly above budget but worth it
                  if you cover 1,500+ km/month.
                </div>
                <div className="spec-pills">
                  <span className="spec-pill">₹12.9 - 14.2L</span>
                  <span className="spec-pill">24.1 km/L</span>
                  <span className="spec-pill">Bose sound</span>
                  <span className="spec-pill warn">Slightly over budget</span>
                </div>
                <div className="review-quote">
                  "Diesel mileage is exceptional for highway driving. The
                  premium feel punches above its price."
                  <div className="review-attr">— Owner, 14 months</div>
                </div>
              </div>
            </div>
          </div>

          <button
            className="cta-btn accent"
            onClick={() => nextPhase(4)}
            id="compare-btn"
            disabled
            style={{ opacity: "0.4" }}
          >
            Compare selected cars →
          </button>
          <div
            style={{
              fontSize: "12px",
              color: "var(--ink3)",
              textAlign: "center",
              marginTop: "6px",
            }}
          >
            Select 2 cars above to compare
          </div>
          <button className="back-link" onClick={() => nextPhase(2)}>
            ← Back to filters
          </button>
        </div>
      )}

      {currentPhase === 5 && (
        <div className="phase active" id="phase-3">
          <div className="phase-eyebrow">Phase 3 · Your shortlist</div>
          <div className="phase-heading">
            4 cars picked <em style={{ fontStyle: "italic" }}>for you</em>
          </div>
          <div className="phase-sub">
            Ranked by fit with your commute, family setup, and budget — not by
            popularity.
          </div>

          <div className="shortlist-list">
            <div
              className="car-card"
              id="car-tata"
              onClick={() => toggleCardSelect("car-tata")}
            >
              <div className="car-card-top">
                <div>
                  <div className="car-card-name">Tata Nexon</div>
                  <div className="car-card-variant">
                    XZ+ (S) Petrol · Automatic
                  </div>
                </div>
                <div className="fit-badge top">94% fit</div>
              </div>
              <div className="car-card-body">
                <div className="why-text-card">
                  Compact enough for city parking, high enough ground clearance
                  for mixed roads, and the 5-star GNCAP rating means your family
                  is well-protected.
                </div>
                <div className="spec-pills">
                  <span className="spec-pill">₹10.5 - 11.8L</span>
                  <span className="spec-pill">17 km/L</span>
                  <span className="spec-pill">5★ GNCAP</span>
                  <span className="spec-pill">Sunroof</span>
                  <span className="spec-pill">382L boot</span>
                </div>
                <div className="review-quote">
                  "Best combination of safety and practicality in this segment.
                  The AMT is perfect for Mumbai traffic."
                  <div className="review-attr">— Owner, 18 months</div>
                </div>
              </div>
            </div>

            <div
              className="car-card"
              id="car-maruti"
              onClick={() => toggleCardSelect("car-maruti")}
            >
              <div className="car-card-top">
                <div>
                  <div className="car-card-name">Maruti Brezza</div>
                  <div className="car-card-variant">
                    ZXi+ Petrol · Automatic
                  </div>
                </div>
                <div className="fit-badge">88% fit</div>
              </div>
              <div className="car-card-body">
                <div className="why-text-card">
                  Lowest running cost in the segment — Maruti's service network
                  is unmatched if you're not always near a big city. Slightly
                  better mileage for daily commuters.
                </div>
                <div className="spec-pills">
                  <span className="spec-pill">₹10.8 - 12.1L</span>
                  <span className="spec-pill">19.8 km/L</span>
                  <span className="spec-pill">Sunroof</span>
                  <span className="spec-pill">328L boot</span>
                  <span className="spec-pill warn">4★ GNCAP</span>
                </div>
                <div className="review-quote">
                  "The mileage is real — I'm getting 17 in city driving. Service
                  costs almost nothing."
                  <div className="review-attr">— Owner, 11 months</div>
                </div>
              </div>
            </div>

            <div
              className="car-card"
              id="car-hyundai"
              onClick={() => toggleCardSelect("car-hyundai")}
            >
              <div className="car-card-top">
                <div>
                  <div className="car-card-name">Hyundai Venue</div>
                  <div className="car-card-variant">SX(O) Petrol · DCT</div>
                </div>
                <div className="fit-badge">81% fit</div>
              </div>
              <div className="car-card-body">
                <div className="why-text-card">
                  The smoothest automatic in this price range — the dual-clutch
                  gearbox is genuinely enjoyable. Smaller footprint makes
                  parking easier. Slightly tight for rear passengers.
                </div>
                <div className="spec-pills">
                  <span className="spec-pill">₹11.9 - 13.4L</span>
                  <span className="spec-pill">18.1 km/L</span>
                  <span className="spec-pill">Connected car tech</span>
                  <span className="spec-pill warn">Less rear legroom</span>
                </div>
                <div className="review-quote">
                  "DCT is buttery smooth. But if you're tall, the rear seat gets
                  cramped on long drives."
                  <div className="review-attr">— Owner, 9 months</div>
                </div>
              </div>
            </div>

            <div
              className="car-card"
              id="car-kia"
              onClick={() => toggleCardSelect("car-kia")}
            >
              <div className="car-card-top">
                <div>
                  <div className="car-card-name">Kia Sonet</div>
                  <div className="car-card-variant">
                    HTX+ Diesel · Automatic
                  </div>
                </div>
                <div className="fit-badge">76% fit</div>
              </div>
              <div className="car-card-body">
                <div className="why-text-card">
                  Best pick if highway runs matter — diesel mileage of 24+ km/L
                  cuts costs significantly. Slightly above budget but worth it
                  if you cover 1,500+ km/month.
                </div>
                <div className="spec-pills">
                  <span className="spec-pill">₹12.9 - 14.2L</span>
                  <span className="spec-pill">24.1 km/L</span>
                  <span className="spec-pill">Bose sound</span>
                  <span className="spec-pill warn">Slightly over budget</span>
                </div>
                <div className="review-quote">
                  "Diesel mileage is exceptional for highway driving. The
                  premium feel punches above its price."
                  <div className="review-attr">— Owner, 14 months</div>
                </div>
              </div>
            </div>
          </div>

          <button
            className="cta-btn accent"
            onClick={() => nextPhase(4)}
            id="compare-btn"
            disabled
            style={{ opacity: "0.4" }}
          >
            Compare selected cars →
          </button>
          <div
            style={{
              fontSize: "12px",
              color: "var(--ink3)",
              textAlign: "center",
              marginTop: "6px",
            }}
          >
            Select 2 cars above to compare
          </div>
          <button className="back-link" onClick={() => nextPhase(2)}>
            ← Back to filters
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
