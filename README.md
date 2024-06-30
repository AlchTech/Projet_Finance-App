          <Router>
          <Navigation /> {/* Composant de navigation */}
          <Routes>
            <Route path="/" element={<Accueil />} />
            <Route path="/patrimoines" element={<Patrimoines />} />
            <Route path="/action" element={<Action />} />
          </Routes>
        </Router>