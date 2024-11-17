export interface Page<T> {
    content: T[];
    empty: boolean;
    first: boolean;
    last: boolean;
    number: number;
    numberOfElements: number;
    pageable: {
      size: number;
    };
    sort: {
      // Especifica aquí la estructura de sort si tienes más detalles
    };
    totalElements: number;
    totalPages: number;
  }
  