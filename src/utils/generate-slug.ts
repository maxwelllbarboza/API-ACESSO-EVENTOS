export function formatarParaURL(texto: string): string {

    // Remove acentos
    const textoSemAcentos = texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    
    // Remove pontos e espaços
    const textoSemPontosEspacos = textoSemAcentos.replace(/[.,\s]/g, "");
    
    // Converte para minúsculas e substitui espaços por hífens
    const textoFormatado = textoSemPontosEspacos.toLowerCase().replace(/\s+/g, "-");
    
    return textoFormatado;
}


