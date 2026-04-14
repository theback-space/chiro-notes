import { NextRequest, NextResponse } from 'next/server';

// IntakeQ API - Create intake WITHOUT sending email to client
// Uses POST /intakes/create (not /intakes/send which triggers emails)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { questionnaireId, clientId, clientName, clientEmail, practitionerId, questions } = body;

    const apiKey = process.env.INTAKEQ_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'IntakeQ API key not configured' }, { status: 500 });
    }

    if (!questionnaireId || (!clientId && !clientEmail)) {
      return NextResponse.json({ error: 'Missing required fields: questionnaireId and clientId or clientEmail' }, { status: 400 });
    }

    // Step 1: Create the intake WITHOUT sending to client
    // POST /intakes/create creates the form in IntakeQ's system
    // without triggering any email/SMS notification to the client
    const createPayload: Record<string, unknown> = {
      QuestionnaireId: questionnaireId,
    };

    // Client identification
    if (clientId) {
      createPayload.ClientId = clientId;
    } else {
      createPayload.ClientName = clientName;
      createPayload.ClientEmail = clientEmail;
    }

    if (practitionerId) {
      createPayload.PractitionerId = practitionerId;
    }

    const createResponse = await fetch('https://intakeq.com/api/v1/intakes/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Auth-Key': apiKey,
      },
      body: JSON.stringify(createPayload),
    });

    if (!createResponse.ok) {
      const errorText = await createResponse.text();
      console.error('IntakeQ create error:', createResponse.status, errorText);
      return NextResponse.json(
        { error: `IntakeQ API error: ${createResponse.status}`, details: errorText },
        { status: createResponse.status }
      );
    }

    const intake = await createResponse.json();
    console.log('IntakeQ intake created:', intake.Id);

    // Step 2: If we have question answers (SOAP note content), update the intake
    if (questions && Array.isArray(questions) && questions.length > 0 && intake.Id) {
      const updatePayload = {
        Id: intake.Id,
        ClientId: intake.ClientId || clientId,
        Questions: questions,
      };

      const updateResponse = await fetch(`https://intakeq.com/api/v1/intakes/${intake.Id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'X-Auth-Key': apiKey,
        },
        body: JSON.stringify(updatePayload),
      });

      if (!updateResponse.ok) {
        const errorText = await updateResponse.text();
        console.error('IntakeQ update error:', updateResponse.status, errorText);
        // Intake was created but answers failed to save
        return NextResponse.json({
          success: true,
          warning: 'Intake created but answers failed to save',
          intakeId: intake.Id,
          updateError: errorText,
        });
      }

      console.log('IntakeQ intake updated with answers');
    }

    return NextResponse.json({
      success: true,
      intakeId: intake.Id,
      message: 'Note saved to IntakeQ (no email sent to client)',
    });

  } catch (error) {
    console.error('IntakeQ API error:', error);
    return NextResponse.json(
      { error: 'Failed to save to IntakeQ', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
