import Concert from './../Concert/Concert';

const Concerts = ({ concerts ,count}) => (
  <section>
    {concerts.map(con => <Concert key={con._id} {...con} count={count} />)}
  </section>
)

export default Concerts;