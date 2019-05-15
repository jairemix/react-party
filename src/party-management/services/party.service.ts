import { of, throwError, Observable } from 'rxjs';
import { PersistedPartyState } from '../state/party.state';

export class PartyService {

  private readonly PARTY_KEY: string = 'PARTY';

  getParty(): Observable<PersistedPartyState> {
    try {
      const raw = localStorage.getItem(this.PARTY_KEY);
      return of(raw && JSON.parse(raw));
    } catch (e) {
      return throwError(e);
    }
  }

  setParty(party: PersistedPartyState): Observable<PersistedPartyState> {
    try {
      const stringified = JSON.stringify(party);
      localStorage.setItem(this.PARTY_KEY, stringified);
      return of(party);
    } catch (e) {
      return throwError(e);
    }
  }

}
