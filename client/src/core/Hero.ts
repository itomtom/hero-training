export class Heroes {
  private readonly BASE_URL = "http://localhost:8000";

  public async getAll() {
    const response = await fetch(`${this.BASE_URL}/heroes`);
    return await response.json();
  }

  public async create(name: string) {
    const response = await fetch(`${this.BASE_URL}/heroes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
    });
    const result = await response.json();

    if (!response.ok) {
      throw Error(result.message);
    }
    return result.id;
  }

  public async remove(id: string) {
    const response = await fetch(`${this.BASE_URL}/heroes/${id}`, {
      method: "DELETE",
    });
    const result = await response.json();

    if (!response.ok) {
      throw Error(result.message);
    }
    return result.message;
  }
}
