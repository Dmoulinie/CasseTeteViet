export class Solution {
  id: number ;
  grid: string;
  createdDate: Date;
  status: string;


  constructor(id: number, grid: string, createdDate: Date, status: string) {
    this.id = id;
    this.grid = grid;
    this.createdDate = createdDate;
    this.status = status;
  }

  public getId(): number {
    return this.id;
  }

  public setId(id: number): void {
    this.id = id;
  }

  public getGrid(): string {
    return this.grid;
  }

  public setGrid(grid: string): void {
    this.grid = grid;
  }


}
